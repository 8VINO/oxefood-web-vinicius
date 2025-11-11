import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCidade() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalDetalhes, setOpenModalDetalhes] = useState(false)


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cidade")
            .then((response) => {
                setLista(response.data)
            })
    }
    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/cidade/' + idRemover)
            .then((response) => {

                console.log('Cidade removida com sucesso.')

                axios.get("http://localhost:8080/api/cidade")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover uma cidade.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema tela={'cidade'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cidades </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cidade'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={12}>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">UF</Table.HeaderCell>

                                    <Table.HeaderCell textAlign="center" width={3} >Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cidade => (

                                    <Table.Row key={cidade.id}>
                                        <Table.Cell>{cidade.nome}</Table.Cell>
                                        <Table.Cell textAlign="center">{cidade.estado?.sigla}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta cidade'
                                                icon>
                                                <Link to="/form-cidade" state={{ id: cidade.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para detalhamento da cidade'
                                                icon
                                                onClick={e => setOpenModalDetalhes(true)}>
                                                <Icon name='info' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta cidade'
                                                icon
                                                onClick={e => confirmaRemover(cidade.id)}>
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
            <Modal
                basic
                onClose={() => setOpenModalDetalhes(false)}
                onOpen={() => setOpenModalDetalhes(true)}
                open={openModalDetalhes}
            >
                <div style={{ backgroundColor: "white", display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <h1 style={{ color: 'black' }}>Detalhamento da cidade</h1>
                        {lista.map(cidade => (
                        <div style={{overflowY:'auto'}}>
                          
                           
                           
                        </div>
                         ))}

                    </div>
                </div>
            </Modal>

        </div>




    )
}
