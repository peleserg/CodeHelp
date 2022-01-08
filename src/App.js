import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Code from './Code'
import { X, Gear } from 'react-bootstrap-icons';
import csharp from './lang/csharp'
import go from './lang/go'
import javascript from './lang/javascript'
import { TrConceptGroups, TrConcepts, TrCodeDescriptions, TrInterface, TrLanguages } from './translate'

const Translate = (source, text, translation) => {
	if (!source.has(text))
		return text
	const destTranslation = source.get(text)[translation]
	if (destTranslation !== undefined) {
		return destTranslation
	} else {
		const enTranslation = source.get(text)["en"]
		if (enTranslation !== undefined) {
			return enTranslation
		} else {
			return text
		}
	}
}

const getCode = (concept, language, translation) => {
	let lang;
	if (language === "csharp") lang = csharp;
	if (language === "go") lang = go;
	if (language === "javascript") lang = javascript;

	if (!lang.has(concept))
		return null

	const code = lang.get(concept).map((item, id) =>
		<Code key={id} title={Translate(TrCodeDescriptions, item.title, translation)}
			code={item.code}
			language={language} />
	)
	return code
}

const getConcepts = (conceptGroup, filter, translation, languages) => {
	const concepts = conceptGroup.map((concept) =>
		(filter && concept.includes(filter)) || !filter ?
			<Card key={concept}>
				<Card.Header as="h5">{Translate(TrConcepts, concept, translation)}</Card.Header>
				{languages.size > 1 &&
					<Card.Body>
						<Stack direction="horizontal" gap={3} style={{ alignItems: "start" }}>
							{[...languages].map((language) =>
								<Col key={language}>
									<Card>
										<Card.Header className="text-center" as="h5">{Translate(TrLanguages, language)}</Card.Header>
										<Card.Body className="py-2">
											<Stack gap={2}>
												{getCode(concept, language, translation)}
											</Stack>
										</Card.Body>
									</Card>
								</Col>
							)}
						</Stack>
					</Card.Body>
				}
				{languages.size === 1 &&
					<Card.Body className="py-2">
						<Stack gap={2}>{getCode(concept, [...languages][0], translation)}</Stack>
					</Card.Body>
				}
			</Card>
			: null
	);
	return concepts
}

const getConceptNumber = (conceptGroup, sPhrase) => {
	const concepts = conceptGroup.filter(concept => concept.includes(sPhrase))
	return concepts.length
}

function App() {

	// TODO synonims for search (remove=delete), good-looking lang names (C#)
	// TODO search in translations

	const [searchPhrase, setSearchPhrase] = useState("")
	const [translation, setTranslation] = useState("ru")
	const [languages, setLanguages] = useState(new Set(["javascript"]))
	const [showMenu, setShowMenu] = useState(false);
	const inputEl = useRef(null);

	const conceptGroups = new Map()
	conceptGroups.set("definition", ["constant", "variable"])
	conceptGroups.set("loop", ["for"])
	conceptGroups.set("bitwise", ["bitwise-xor"])
	conceptGroups.set("array", ["array-length", "array-add", "array-remove", "array-includes", "array-index-of"])

	const switchLanguage = (language) => {
		const tmpLanguages = new Set(languages)
		if (tmpLanguages.has(language)) {
			tmpLanguages.delete(language)
		} else {
			tmpLanguages.add(language)
		}
		setLanguages(new Set(tmpLanguages))
	}

	const listItems = [...conceptGroups.keys()].map((conceptGroup) =>
		conceptGroup.includes(searchPhrase) || getConceptNumber(conceptGroups.get(conceptGroup), searchPhrase) > 0 ?
			<Card key={conceptGroup} className="mt-3">
				<Card.Header as="h5">{Translate(TrConceptGroups, conceptGroup, translation)}</Card.Header>
				<Card.Body>
					<Stack gap={3}>
						{getConcepts(conceptGroups.get(conceptGroup), conceptGroup.includes(searchPhrase) ? "" : searchPhrase, translation, languages)}
					</Stack>
				</Card.Body>
			</Card>
			: null
	);

	const listLanguages = ["csharp", "go", "javascript"].map((language) =>
		<Form.Check
			key={language}
			type="checkbox"
			label={Translate(TrLanguages, language)}
			checked={languages.has(language)}
			onChange={() => switchLanguage(language)} />
	)

	const listTranslations = ["en", "ru"].map((language) =>
		<Form.Check
			key={language}
			type="checkbox"
			label={Translate(TrInterface, language, translation)}
			checked={translation === language}
			onChange={() => setTranslation(language)} />
	)

	return (
		<div className="App">
			<Container className="my-3">
				<Stack direction="horizontal" gap={3}>
					<InputGroup>
						<Form.Control
							variant="danger"
							type="text"
							placeholder={Translate(TrInterface, "search", translation)}
							ref={inputEl}
							value={searchPhrase}
							onChange={e => { setSearchPhrase(e.target.value)}}
						>
						</Form.Control>
						<Button variant="outline-secondary" onClick={() => { setSearchPhrase("") }}>
							<X />
						</Button>
					</InputGroup>
					<Button variant="outline-primary" onClick={() => setShowMenu(true)}>
						<Gear />
					</Button>
				</Stack>
				{listItems}
			</Container>
			<Offcanvas show={showMenu} placement={"end"} onHide={() => setShowMenu(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>{Translate(TrInterface, "settings", translation)}</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Stack gap={3}>
						<Card>
							<Card.Header as="h5">{Translate(TrInterface, "languages", translation)}</Card.Header>
							<Card.Body>
								{listLanguages}
							</Card.Body>
						</Card>
						<Card>
							<Card.Header as="h5">{Translate(TrInterface, "translation", translation)}</Card.Header>
							<Card.Body>
								{listTranslations}
							</Card.Body>
						</Card>
					</Stack>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default App;
