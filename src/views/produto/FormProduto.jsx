import axios from 'axios';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
export default function FormProduto() {
    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnit, setValorUnit] = useState();
    const [tempMin, setTempMin] = useState();
    const [tempMax, setTempMax] = useState();

    const [listaCategoria, setListaCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState();

    const { state } = useLocation()
    const [idProduto, setIdProduto] = useState();
    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setCodigo(response.data.codigo)
                    setTitulo(response.data.titulo)
                    setDescricao(response.data.descricao)
                    setValorUnit(response.data.valorUnitario)
                    setTempMin(response.data.tempoEntregaMinimo)
                    setTempMax(response.data.tempoEntregaMaximo)
                    setIdCategoria(response.data.categoria?.id)
                })
        }
        axios.get("http://localhost:8080/api/categoriaproduto")
            .then((response) => {
                const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
                setListaCategoria(dropDownCategorias);
            })

    }, [state])

    function salvar() {
        let produtoRequest = {
            idCategoria:idCategoria,
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnit,
            tempoEntregaMaximo: tempMax,
            tempoEntregaMinimo: tempMin
        }
        if (idProduto != null) {
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then((response) => { console.log("Produto atualizado com sucesso") })
                .catch((error) => { console.log("Erro ao atualizar produto", error.response ? error.response.value : error) })
        } else {
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => { console.log("Produto cadastrado com sucesso") })
                .catch((error) => { console.log("Erro ao cadastrar produto", error.response ? error.response.value : error) })
        }



    }
    return (
        <div>
            <MenuSistema tela={"produto"} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    {idProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto&nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto&nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />
                    <div style={{ marginTop: '4%' }}>

                        <Form >
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Título'
                                    required
                                    placeholder='Informe o título do produto'
                                    maxLength='100'
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)} />

                                <Form.Input
                                    fluid
                                    label='Código do produto'
                                    required
                                    placeholder='Informe o código do produto'
                                    type='number'
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Select
                                required
                                fluid
                                tabIndex='3'
                                placeholder='Selecione'
                                label='Categoria'
                                options={listaCategoria}
                                value={idCategoria}
                                onChange={(e, { value }) => {
                                    setIdCategoria(value)
                                }}
                            />

                            <Form.TextArea
                                label='Descrição'
                                value={descricao}
                                placeholder='Informe a descrição do produto'
                                onChange={e => setDescricao(e.target.value)}>

                            </Form.TextArea>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    required
                                    type='number'
                                    value={valorUnit}
                                    onChange={(e, { value }) => setValorUnit(value)}

                                />
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder='30'
                                    type='number'
                                    value={tempMin}
                                    onChange={(e, { value }) => setTempMin(value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    type='number'
                                    value={tempMax}
                                    onChange={(e, { value }) => setTempMax(value)}
                                />

                            </Form.Group>

                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Link to='/list-produto'>
                                <Button
                                    type='button'
                                    inverted
                                    icon
                                    circular
                                    labelPosition='left'
                                    color='orange'

                                >
                                    <Icon name='reply' />
                                    Listar

                                </Button>
                            </Link>
                            <Button
                                type='button'
                                inverted
                                color='blue'
                                icon
                                circular
                                labelPosition='left'
                                floated='right'
                                onClick={() => salvar()}>
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
    )
}