import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Code from './Code'
import { X } from 'react-bootstrap-icons';
import csharp from './lang/csharp'
import go from './lang/go'
import javascript from './lang/javascript'
import { TrConceptGroups, TrConcepts, TrCodeDescriptions } from './translate'

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

	const code = lang.get(concept).map((item) =>
		<Card.Body style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
			<Code title={Translate(TrCodeDescriptions, item.title, translation)}
				code={item.code}
				language={language} />
		</Card.Body>
	)
	return code
}

const getConcepts = (conceptGroup, filter, translation) => {
	const languages = ["csharp", "go", "javascript"]
	const concepts = conceptGroup.map((concept) =>
		(filter && concept.includes(filter)) || !filter ?
		<Card className="mt-1">
			<Card.Header as="h5">{Translate(TrConcepts, concept, translation)}</Card.Header>
			<Card.Body>
				<Row>
					{languages.map((language) =>
						<Col>
							<Card>
								<Card.Header className="text-center" as="h5">{language}</Card.Header>
								{getCode(concept, language, translation)}
							</Card>
						</Col>
					)}
				</Row>
			</Card.Body>
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

	const [showClearButton, setShowClearButton] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [translation, setTranslation] = useState("ru");
	const inputEl = useRef(null);
	const allConceptGroups = new Map()
	allConceptGroups.set("definition", ["constant", "variable"])
	allConceptGroups.set("loop", ["for"])
	allConceptGroups.set("bitwise", ["bitwise-xor"])
	allConceptGroups.set("array", ["array-length", "array-add", "array-remove", "array-includes", "array-index-of"])
	const conceptGroups = ["definition", "loop", "bitwise", "array"]
	
	const listItems = conceptGroups.map((conceptGroup) =>
		conceptGroup.includes(searchPhrase) || getConceptNumber(allConceptGroups.get(conceptGroup), searchPhrase) > 0 ?
		<Card className="mt-3">
			<Card.Header as="h5">{Translate(TrConceptGroups, conceptGroup, translation)}</Card.Header>
			<Card.Body>
				{getConcepts(allConceptGroups.get(conceptGroup), conceptGroup.includes(searchPhrase) ? "" : searchPhrase, translation)}
			</Card.Body>
		</Card>
		: null
	);
	return (
		<div className="App">
			<Container>
				<div style={{ position: "relative" }}
					onMouseEnter={(e) => setShowClearButton(searchPhrase !== "")}
					onMouseLeave={(e) => setShowClearButton(false)}>
					<Form.Control ref={inputEl} value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)} className="mt-3" type="text" placeholder="Search..." />
					{showClearButton && <Button variant="outline-secondary"
						onClick={() => { setSearchPhrase("") }}
						style={{ position: "absolute", top: "0rem", right: "0rem" }}>
						<X />
					</Button>
					}
				</div>
				{listItems}
			</Container>
		</div>
	);
}

export default App;
