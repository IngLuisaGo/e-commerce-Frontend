import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../usuarios.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPromprs from '../../prompts/confirmation';

export default class UsuariosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // FIX: usa un único nombre consistente
      idUsuario: this.props.getIdUsuario(),
      rediret: false,
      message: { text: '', show: false },
      confirmation: {
        title: 'Modificar usuario',
        text: '¿Desea modificar el usuario?',
        show: false,
      },
      loading: false,
      usuario: {
        usuario: '',
        pass: '',
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario() {
    const { idUsuario } = this.state;
    if (!idUsuario) return;

    this.setState({ loading: true });
    request
      .get(`/usuarios/${idUsuario}`)
      .then((response) => {
        this.setState({
          usuario: response.data || { usuario: '', pass: '' },
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setValue(campo, value) {
    this.setState({
      usuario: {
        ...this.state.usuario,
        [campo]: value,
      },
    });
  }

  guardarUsuarios() {
    const { idUsuario, usuario } = this.state;
    if (!idUsuario) return;

    this.setState({ loading: true });
    request
      .put(`/usuarios/${idUsuario}`, usuario)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        // FIX: al fallar, loading debe quedar en false
        this.setState({ loading: false });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab('buscar');
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      () => this.guardarUsuarios()
    );
  }

  render() {
    const { usuario, loading, message, confirmation } = this.state;

    return (
      <Container id="usuarios-crear-container">
        <MessagePrompt
          text={message.text}
          show={message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />
        <ConfirmationPromprs
          show={confirmation.show}
          title={confirmation.title}
          text={confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <Loading show={loading} />

        <Row>
          <h1>Editar Usuarios</h1>
        </Row>

        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={usuario.usuario ?? ''}
                onChange={(e) => this.setValue('usuario', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={usuario.pass ?? ''}
                onChange={(e) => this.setValue('pass', e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...confirmation, show: true },
                })
              }
            >
              Guardar Usuario
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
