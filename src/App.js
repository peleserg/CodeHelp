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

const getCode = (concept, language) => {
	let lang;
	if (language === "csharp") lang = csharp;
	if (language === "go") lang = go;
	if (language === "javascript") lang = javascript;

	if (!lang.has(concept))
		return null

	const code = lang.get(concept).map((item) =>
		<Card.Body style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
			<Code title={item.title}
				code={item.code}
				language={language} />
		</Card.Body>
	)
	return code
}

const getConcepts = (conceptGroup, filter) => {
	const languages = ["csharp", "go", "javascript"]
	const concepts = conceptGroup.map((concept) =>
		(filter && concept.includes(filter)) || !filter ?
		<Card className="mt-1">
			<Card.Header as="h5">{concept}</Card.Header>
			<Card.Body>
				<Row>
					{languages.map((language) =>
						<Col>
							<Card>
								<Card.Header className="text-center" as="h5">{language}</Card.Header>
								{getCode(concept, language)}
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
	const [showClearButton, setShowClearButton] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
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
			<Card.Header as="h5">{conceptGroup}</Card.Header>
			<Card.Body>
				{getConcepts(allConceptGroups.get(conceptGroup), conceptGroup.includes(searchPhrase) ? "" : searchPhrase)}
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
