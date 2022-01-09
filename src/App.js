import React, { useState, useRef } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import { X, Gear, Search } from 'react-bootstrap-icons';

import Code from './Code'
import { TrConceptGroups, TrConcepts, TrCodeDescriptions, TrInterface, TrLanguages, TrSynonyms } from './translate'
import csharp from './lang/csharp'
import go from './lang/go'
import javascript from './lang/javascript'

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

const containsSearchPhrase = (concept, searchPhrase, translation, translationGroup) => {
	if (!searchPhrase) return true
	const lConcept = concept.toLowerCase()
	const lSearchPhrase = searchPhrase.toLowerCase()
	if (lConcept.includes(lSearchPhrase)) return true
	if (Translate(translationGroup, concept, "en").toLowerCase().includes(lSearchPhrase)) return true
	if (translation !== "en" && Translate(translationGroup, concept, translation).toLowerCase().includes(lSearchPhrase)) return true
	if (Translate(TrSynonyms, concept, "en").toLowerCase().includes(lSearchPhrase)) return true
	if (translation !== "en" && Translate(TrSynonyms, concept, translation).toLowerCase().includes(lSearchPhrase)) return true
	return false
}

const getConcepts = (conceptGroup, searchPhrase, translation, languages, hideBlocksWithoutCode) => {
	const concepts = conceptGroup.map((concept) => {
		const languageMap = [...languages].map((language) => {return {language: language, code: getCode(concept, language, translation)}})
		const codeBlocks = languageMap.reduce((prev, current) => {return prev + (current.code === null ? 0 : 1)}, 0)
		if (hideBlocksWithoutCode && codeBlocks === 0) return null
		return containsSearchPhrase(concept, searchPhrase, translation, TrConcepts) ?
			<Card key={concept} className="my-0">
				<Card.Header as="h5">{Translate(TrConcepts, concept, translation)}</Card.Header>
				{languages.size > 1 &&
					<Card.Body>
						<Stack direction="horizontal" gap={3} style={{ alignItems: "start" }}>
							{[...languages].map((language) => {
								const code = getCode(concept, language, translation)
								return code !== null ? <Col key={language}>
									<Card>
										<Card.Header className="text-center" as="h5">{Translate(TrLanguages, language)}</Card.Header>
										<Card.Body className="py-2">
											<Stack gap={2}>
												{code}
											</Stack>
										</Card.Body>
									</Card>
								</Col>
								: <Col key={language}>
									<Card>
										<Card.Header className="text-center" as="h5">{Translate(TrLanguages, language)}</Card.Header>
										<Card.Body className="py-2">
											{Translate(TrInterface, "no-sample-code", translation)}
										</Card.Body>
									</Card>
								</Col>
							}
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
			}
		)
	return concepts.filter((concept) => concept !== null)
}

function App() {

	const [searchPhrase, setSearchPhrase] = useState("")
	const [translation, setTranslation] = useState("ru")
	const [languages, setLanguages] = useState(new Set(["javascript"]))
	const [showMenu, setShowMenu] = useState(false);
	const [hideBlocksWithoutCode, setHideBlocksWithoutCode] = useState(false);
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

	const listItems = [...conceptGroups.keys()].map((conceptGroup) => {
		const searchSuccess = containsSearchPhrase(conceptGroup, searchPhrase, translation, TrConceptGroups)
		const concepts = getConcepts(conceptGroups.get(conceptGroup), searchSuccess ? "" : searchPhrase, translation, languages, hideBlocksWithoutCode)
		return concepts.length > 0 || (searchPhrase !== "" && searchSuccess) ?
			<Card key={conceptGroup} className="mb-3">
				<Card.Header as="h5">{Translate(TrConceptGroups, conceptGroup, translation)}</Card.Header>
				<Card.Body>
					<Stack gap={3}>
						{concepts}
					</Stack>
				</Card.Body>
			</Card>
			: null
	}
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
			<Container>
				<Stack className="py-3" direction="horizontal" gap={3} style={{position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>
					<InputGroup.Text>
						{languages.size === 0 ? Translate(TrInterface, "language-not-selected", translation)
						: languages.size === 1 ? Translate(TrLanguages, [...languages][0])
						: Translate(TrInterface, "compare-mode", translation)}
					</InputGroup.Text>
					<InputGroup>
						<InputGroup.Text>
							<Search />
						</InputGroup.Text>
						<Form.Control
							type="text"
							placeholder={Translate(TrInterface, "search", translation)}
							ref={inputEl}
							value={searchPhrase}
							onChange={e => { setSearchPhrase(e.target.value) }}
						>
						</Form.Control>
						<Button variant="outline-secondary" onClick={() => { setSearchPhrase("")}}>
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
						<Card>
							<Card.Header as="h5">{Translate(TrInterface, "miscellaneous", translation)}</Card.Header>
							<Card.Body>
								<Form.Check
									type="checkbox"
									label={Translate(TrInterface, "hide-blocks-without-code", translation)}
									checked={hideBlocksWithoutCode}
									onChange={() => setHideBlocksWithoutCode(!hideBlocksWithoutCode)} />
							</Card.Body>
						</Card>
					</Stack>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default App;
