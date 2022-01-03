import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Code from './Code'
import csharp from './lang/csharp'
import go from './lang/go'
import javascript from './lang/javascript'

const getCode = (concept, language) => {
	let lang;
	if (language === "csharp") lang = csharp;
	if (language === "go") lang = go;
	if (language === "javascript") lang = javascript;

	const code = lang.get(concept).map((item) =>
		<Card.Body>
			<Code title={item.title}
				code={item.code}
				language={language} />
		</Card.Body>
	)
	return code
}

function App() {
	const concepts = ["constant", "variable", "for"]
	const languages = ["csharp", "go", "javascript"]
	const listItems = concepts.map((concept) =>
		<Card className="mt-4">
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
	);
	return (
		<div className="App">
			<Container>
				{listItems}
			</Container>
		</div>
	);
}

export default App;
