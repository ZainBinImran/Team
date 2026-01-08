import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTrophy, FaUsers, FaHistory } from 'react-icons/fa';
import api from '../services/api';

function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    api.getTournaments().then(data => {
      setTournaments(data.slice(0, 3));
    });
    api.getPlayers().then(data => {
      setPlayers(data.slice(0, 4));
    });
  }, []);

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <h1 className="display-4 fw-bold mb-4 text-primary">
            Pakistan Cricket Legacy
          </h1>
          <p className="lead mb-4">
            Explore the rich history of Pakistan cricket through World Cups, 
            Champions Trophies, Asia Cups, and legendary players who shaped the game.
          </p>
          <Button as={Link} to="/tournaments" variant="primary" size="lg">
            Explore Tournaments <FaArrowRight className="ms-2" />
          </Button>
        </Col>
        <Col md={6}>
          <img 
            src="https://images.unsplash.com/photo-1595435934247-5d33b7f92c70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Cricket Stadium"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow">
            <Card.Body>
              <FaTrophy size={48} className="text-warning mb-3" />
              <Card.Title className="h4">Major Trophies</Card.Title>
              <Card.Text>
                <h3 className="text-primary">3</h3>
                <p>World Cup, Champions Trophy & Multiple Asia Cups</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow">
            <Card.Body>
              <FaUsers size={48} className="text-success mb-3" />
              <Card.Title className="h4">Legendary Players</Card.Title>
              <Card.Text>
                <h3 className="text-primary">500+</h3>
                <p>International players since 1952</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow">
            <Card.Body>
              <FaHistory size={48} className="text-info mb-3" />
              <Card.Title className="h4">Tournaments</Card.Title>
              <Card.Text>
                <h3 className="text-primary">50+</h3>
                <p>ICC & ACC tournaments participated</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Tournaments */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Recent Tournament Squads</h2>
          <Row>
            {tournaments.map(tournament => (
              <Col key={tournament.id} md={4} className="mb-4">
                <Card className="h-100 shadow">
                  <Card.Img 
                    variant="top" 
                    src={tournament.image_url || "https://images.unsplash.com/photo-1595435934247-5d33b7f92c70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    height="200"
                  />
                  <Card.Body>
                    <Card.Title>{tournament.name} {tournament.year}</Card.Title>
                    <Card.Text>
                      {tournament.location} • {tournament.result}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/tournaments/${tournament.id}`} 
                      variant="outline-primary"
                    >
                      View Squad
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Featured Players */}
      <Row>
        <Col>
          <h2 className="mb-4">Featured Players</h2>
          <Row>
            {players.map(player => (
              <Col key={player.id} md={3} className="mb-4">
                <Card className="h-100 shadow">
                  <Card.Img 
                    variant="top" 
                    src={player.image_url || "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    height="200"
                  />
                  <Card.Body>
                    <Card.Title>{player.name}</Card.Title>
                    <Card.Text>
                      {player.role} • Debut: {player.debut_year}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/players/${player.id}`} 
                      variant="outline-primary"
                      size="sm"
                    >
                      View Profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;