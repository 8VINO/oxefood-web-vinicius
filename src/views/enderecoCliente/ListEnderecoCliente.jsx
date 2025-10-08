import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import ModalBase from "../../ModalBase";
export default function ListEnderecoCliente() {

    const [listaEnderecos, setListaEnderecos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalBase, setOpenModalBase] = useState(true);

    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState();

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cliente/" + state.id)
            .then((response) => {
                setIdCliente(response.data.id)
                setListaEnderecos(response.data.enderecos)
            })
    }
    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/cliente/endereco/' + idRemover)
            .then((response) => {

                console.log('Produto removido com sucesso.')

                axios.get("http://localhost:8080/api/cliente/" + idCliente)
                    .then((response) => {
                        setListaEnderecos(response.data.enderecos)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um endereco.')
            })
        setOpenModal(false)
    }

    return (
        <ModalBase
            open={openModalBase}
            onClose={() => {
                setOpenModalBase(false);
                window.history.back(); // volta pra página anterior ao fechar
            }}
        >
            <div>
                <div style={{ marginTop: '3%' }}>

                    <Container textAlign='justified' >

                        <h2> Endereços do Cliente </h2>
                        <Divider />

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                label='Novo'
                                circular
                                color='orange'
                                icon='clipboard outline'
                                floated='right'
                                as={Link}
                                to='/form-endereco-cliente'
                                state={{ idCliente: idCliente }}
                            />
                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Rua</Table.HeaderCell>
                                        <Table.HeaderCell>Número</Table.HeaderCell>
                                        <Table.HeaderCell>Bairro</Table.HeaderCell>
                                        <Table.HeaderCell>CEP</Table.HeaderCell>
                                        <Table.HeaderCell>Cidade</Table.HeaderCell>
                                        <Table.HeaderCell>Estado</Table.HeaderCell>
                                        <Table.HeaderCell>Complemento</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center" >Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {listaEnderecos.map(endereco => (

                                        <Table.Row key={endereco.id}>
                                            <Table.Cell>{endereco.rua}</Table.Cell>
                                            <Table.Cell>{endereco.numero}</Table.Cell>
                                            <Table.Cell>{endereco.bairro}</Table.Cell>
                                            <Table.Cell>{endereco.cep}</Table.Cell>
                                            <Table.Cell>{endereco.cidade}</Table.Cell>
                                            <Table.Cell>{endereco.estado}</Table.Cell>
                                            <Table.Cell>{endereco.complemento}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste endereco'
                                                    icon>
                                                    <Link to="/form-endereco-cliente" state={{ idEndereco: endereco.id, idCliente: idCliente }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;
                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este endereco'
                                                    icon
                                                    onClick={e => confirmaRemover(endereco.id)}
                                                >
                                                    <Icon name='trash' />
                                                </Button>

                                            </Table.Cell>
                                        </Table.Row>
                                    ))}

                                </Table.Body>
                            </Table>
                        </div>
                    </Container>
                </div>

                <Modal
                    basic
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                >
                    <Header icon>
                        <Icon name='trash' />
                        <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                    </Header>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                            <Icon name='remove' /> Não
                        </Button>
                        <Button color='green' inverted onClick={() => remover()}>
                            <Icon name='checkmark' /> Sim
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </ModalBase>



    )
}
