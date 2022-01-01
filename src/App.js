import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Code from './Code'

function App() {
	return (
		<div className="App">
			<Container>
				<Card className="mt-4">
					<Card.Header as="h5">Объявление константы</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">C#</Card.Header>
									<Card.Body>
										<Code title=""
											code={`const int i = 42;`}
											language="csharp" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">Go</Card.Header>
									<Card.Body>
										<Code title=""
											code={`const i = 42`}
											language="go" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">JavaScript</Card.Header>
									<Card.Body>
										<Code title=""
											code={`const i = 42`}
											language="javascript" />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className="mt-4">
					<Card.Header as="h5">Объявление переменной</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">C#</Card.Header>
									<Card.Body>
										<Code title=""
											code={`int i = 42;`}
											language="csharp" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">Go</Card.Header>
									<Card.Body>
										<Code title=""
											code={`var i int = 42`}
											language="go" />
										<Code title=""
											code={`i := 42`}
											language="go" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">JavaScript</Card.Header>
									<Card.Body>
										<Code title=""
											code={`var i = 42`}
											language="javascript" />
											<Code title="С блочной областью видимости:"
											code={`let i = 42`}
											language="javascript" />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className="mt-4">
					<Card.Header as="h5">Цикл for</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">C#</Card.Header>
									<Card.Body>
										<Code title=""
											code={`for (int i = 0; i < 10; i++)
{
	// some code
}`}
											language="csharp" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">Go</Card.Header>
									<Card.Body>
										<Code title=""
											code={`for i := 0; i < 10; i++ {
	// some code
}`}
											language="go" />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Header class="text-center" as="h5">JavaScript</Card.Header>
									<Card.Body>
										<Code title=""
											code={`for (var i = 0; i < 10; i++) {
	// some code
}`}
											language="javascript" />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}

export default App;
