import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../usuarios.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';


export default class UsuariosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rediret: false,
            message: {
                text: "",
                show: false
            },
            loading: false,
            usuario: {
                usuario: "",
                pass: "",

            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
    }
    setValue(inicioe, value) {
        this.setState({
            usuario: {
                ...this.state.usuario,
                [inicioe]: value,
            },
        });
    }
    guardarUsuarios() {
        this.setState({ loading: true });
        request
            .post('/usuarios', this.state.usuario)
            .then((response) => {
                if (response.data.exito) {
                    this.setState({
                        rediret: response.data.exito,
                        message: {
                            text: response.data.msg,
                            show: true,
                        },
                    })
                }
                this.setState({ loading: false });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: true });
            })
    }

    onExitedMessage() {
        if (this.state.rediret) this.props.changeTab('buscar');
    }
    render() {
        return (
            <Container id="usuarios-crear-container">
                <MessagePrompt text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage} />
                <Loading show={this.state.loading} />
                <Row>
                    <h1>Crear Usuarios</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control onChange={(e) => this.setValue('usuario', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => this.setValue('pass', e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => console.log(this.guardarUsuarios())}>
                            Guardar Usuario
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}



