import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='light'  expand='lg' class="text-dark">
        
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Artist Search by Name
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For an Artist
              </Nav.Link>
              {/* if user is logged in show saved artist and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Artist
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>

            
            
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <Jumbotron fluid>
        <Container>
           <h1>Art-Spo</h1>
              <p>
                If you're an inspiring artist, creative, or just curious about how or why
                anyone would care about art, begin your journey here. Search for an artist to learn 
                more about what they did, who they are, and how they made an impression in the world. Find your
                art inspiration with Art-Spo.
              </p>
        </Container>
      </Jumbotron>

      <Container>
          <Card>
      
      <Card.Body>
        <blockquote >
          <h2>
            {' '}
            Not sure who to look for? Here are some famous artist's!{' '}
          </h2>
          <footer >
             
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    
    </Container>
    


              <Container>
                  <CardDeck>
                    <Card>
                      <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/1/1e/Frida_Kahlo_%28self_portrait%29.jpg" />
                  <Card.Body>
                      <Card.Title>Frida Kahlo</Card.Title>
                  <Card.Text>
                  Magdalena Carmen Frida Kahlo y Calderón was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.
                  </Card.Text>
                </Card.Body>
                    <Card.Footer>
                  <small className="text-muted"><a href="https://en.wikipedia.org/wiki/Frida_Kahlo">Learn More</a></small>
                    </Card.Footer>
                  </Card>
                    <Card>
                      <Card.Img variant="top" src="https://images.fineartamerica.com/images-medium-large-5/1490-leonardo-da-vinci-colour-portrait-paul-d-stewart.jpg" />
                    <Card.Body>
                  <Card.Title>Leonardo DaVinci</Card.Title>
                  <Card.Text>
                  Leonardo da Vinci was an Italian polymath of the High Renaissance who is widely considered one of the most diversely talented individuals ever to have lived.{' '}
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                  <small className="text-muted"><a href="https://en.wikipedia.org/wiki/Leonardo_da_Vinci">Learn More</a></small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Self-portrait_as_the_Allegory_of_Painting_%28La_Pittura%29_-_Artemisia_Gentileschi.jpg/800px-Self-portrait_as_the_Allegory_of_Painting_%28La_Pittura%29_-_Artemisia_Gentileschi.jpg" />
                <Card.Body>
                  <Card.Title>Artemisia Gentileschi</Card.Title>
                  <Card.Text>
                  Artemisia Lomi or Artemisia Gentileschi was an Italian Baroque painter. Artemisia is considered among the most accomplished seventeenth-century artists, initially working in the style of Caravaggio. 
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted" ><a href="https://en.wikipedia.org/wiki/Artemisia_Gentileschi">Learn More</a></small>
                </Card.Footer>
              </Card>
            </CardDeck>
            </Container>
            <Card.Header></Card.Header>


    </>
  );
};

export default AppNavbar;