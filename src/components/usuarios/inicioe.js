import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import UsuariosBuscar from './crud/buscar';
import UsuariosCrear from './crud/crear';
import UsuariosEditar from './crud/editar';
import "./usuarios.css";

export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdUsuario = this.setIdUsuario.bind(this);
    this.getIdUsuario = this.getIdUsuario.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdUsuario(id) {
    this.setState({ _id: id });
  }

  getIdUsuario() {
    return this.state._id;
  }

  render() {
    return (
      <Container id="usuario-container" className="usuario-container">
        <Row className="usuario-toolbar">
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="/buscar"
            className="usuario-tabs shadow-sm"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        <Row className="usuario-content">
          {this.state.currentTab === "buscar" ? (
            <UsuariosBuscar
              changeTab={this.changeTab}
              setIdUsuario={this.setIdUsuario}
            />
          ) : this.state.currentTab === "crear" ? (
            <UsuariosCrear changeTab={this.changeTab} />
          ) : (
            <UsuariosEditar
              changeTab={this.changeTab}
              getIdUsuario={this.getIdUsuario}
            />
          )}
        </Row>
      </Container>
    );
  }
}
