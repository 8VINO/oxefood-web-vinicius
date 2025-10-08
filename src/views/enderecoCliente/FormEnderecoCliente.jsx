import axios from 'axios';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ModalBase from "../../ModalBase";
export default function FormEnderecoCliente() {

    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [complemento, setComplemento] = useState();

    const [openModalBase, setOpenModalBase] = useState(true);

    const estadosBrasileiros = [
        { key: 'AC', value: 'AC', text: 'AC' },
        { key: 'AL', value: 'AL', text: 'AL' },
        { key: 'AP', value: 'AP', text: 'AP' },
        { key: 'AM', value: 'AM', text: 'AM' },
        { key: 'BA', value: 'BA', text: 'BA' },
        { key: 'CE', value: 'CE', text: 'CE' },
        { key: 'DF', value: 'DF', text: 'DF' },
        { key: 'ES', value: 'ES', text: 'ES' },
        { key: 'GO', value: 'GO', text: 'GO' },
        { key: 'MA', value: 'MA', text: 'MA' },
        { key: 'MT', value: 'MT', text: 'MT' },
        { key: 'MS', value: 'MS', text: 'MS' },
        { key: 'MG', value: 'MG', text: 'MG' },
        { key: 'PA', value: 'PA', text: 'PA' },
        { key: 'PB', value: 'PB', text: 'PB' },
        { key: 'PR', value: 'PR', text: 'PR' },
        { key: 'PE', value: 'PE', text: 'PE' },
        { key: 'PI', value: 'PI', text: 'PI' },
        { key: 'RJ', value: 'RJ', text: 'RJ' },
        { key: 'RN', value: 'RN', text: 'RN' },
        { key: 'RS', value: 'RS', text: 'RS' },
        { key: 'RO', value: 'RO', text: 'RO' },
        { key: 'RR', value: 'RR', text: 'RR' },
        { key: 'SC', value: 'SC', text: 'SC' },
        { key: 'SP', value: 'SP', text: 'SP' },
        { key: 'SE', value: 'SE', text: 'SE' },
        { key: 'TO', value: 'TO', text: 'TO' }

    ]
    const [idEndereco, setIdEndereco] = useState();

    const { state } = useLocation()



    useEffect(() => {
        if (state != null && state.idEndereco != null) {
            axios.get("http://localhost:8080/api/cliente/" + state.idCliente)
                .then((response) => {
                    const enderecos = response.data.enderecos
                    const enderecoEncontrado = enderecos.find(endereco => endereco.id === state.idEndereco)
                    if (enderecoEncontrado) {
                        setIdEndereco(enderecoEncontrado.id)
                        setRua(enderecoEncontrado.rua);
                        setNumero(enderecoEncontrado.numero);
                        setBairro(enderecoEncontrado.bairro);
                        setCep(enderecoEncontrado.cep);
                        setCidade(enderecoEncontrado.cidade);
                        setEstado(enderecoEncontrado.estado);
                        setComplemento(enderecoEncontrado.complemento);
                    }
                })
        }


    }, [state])

    function salvar() {
        let enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            complemento: complemento
        }
        if (idEndereco != null) {
            axios.put("http://localhost:8080/api/cliente/endereco/" + idEndereco, enderecoRequest)
                .then((response) => { console.log("Endereço atualizado com sucesso") })
                .catch((error) => { console.log("Erro ao atualizar endreço", error.response ? error.response.value : error) })
        } else {
            axios.post("http://localhost:8080/api/cliente/endereco/" + state.idCliente, enderecoRequest)
                .then((response) => { console.log("Endereço cadastrado com sucesso") })
                .catch((error) => { console.log("Erro ao cadastrar endereço", error.response ? error.response.value : error) })
        }



    }
    const fecharModal = () => {
        setOpenModalBase(false);
        window.history.back();
    };
    return (
        <ModalBase
            open={openModalBase}
            onClose={fecharModal}
        >
            <div>
                <div style={{ marginTop: '3%' }}>
                    <Container textAlign='justified'>

                        {idEndereco === undefined &&
                            <h2> <span style={{ color: 'darkgray' }}> Endereço&nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                        }
                        {idEndereco != undefined &&
                            <h2> <span style={{ color: 'darkgray' }}> Endereço&nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                        }

                        <Divider />
                        <div style={{ marginTop: '4%' }}>

                            <Form >

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    required
                                    value={rua}
                                    onChange={(e, { value }) => setRua(value)} />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    required
                                    type='number'
                                    value={numero}
                                    onChange={(e, { value }) => setNumero(value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    required
                                    value={bairro}
                                    onChange={(e, { value }) => setBairro(value)}

                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    required
                                    value={cep}
                                    onChange={(e, { value }) => setCep(value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    required
                                    value={cidade}
                                    onChange={(e, { value }) => setCidade(value)}
                                />
                                <Form.Select
                                    required
                                    fluid
                                    tabIndex='3'
                                    placeholder='Selecione'
                                    label='Estado'
                                    options={estadosBrasileiros}
                                    value={estado}
                                    onChange={(e, { value }) => {
                                        setEstado(value)
                                    }}
                                />
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    required
                                    value={complemento}
                                    onChange={(e, { value }) => setComplemento(value)}
                                />



                            </Form>
                            <div style={{ marginTop: '4%' }}>

                                <Button
                                    type='button'
                                    inverted
                                    icon
                                    circular
                                    labelPosition='left'
                                    color='orange'
                                    onClick={e => fecharModal()}
                                >
                                    <Icon name='reply' />
                                    Listar

                                </Button>

                                <Button
                                    type='button'
                                    inverted
                                    color='blue'
                                    icon
                                    circular
                                    labelPosition='left'
                                    floated='right'
                                    onClick={() => salvar()}
                                >
                                    <Icon
                                        name='save'
                                    />
                                    Salvar

                                </Button>
                            </div>

                        </div>

                    </Container>
                </div>
            </div>
        </ModalBase>
    )
}