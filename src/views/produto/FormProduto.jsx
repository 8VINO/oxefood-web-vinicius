import axios from 'axios';
import { Button, Container, Divider, Form, Icon, Image } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { notifyError, notifySuccess } from "../util/Util.js";
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

    const [imagem, setImagem] = useState(null);
  	const [preview, setPreview] = useState(null);
    
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
                    setImagem(response.data.imagem);
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
                .then((response) => { 
                    atualizaImagem(idProduto);
                    notifySuccess("Produto atualizado com sucesso."); })
                .catch((error) => { 
                    if (error.response.data.errors != undefined) {
                                for (let i = 0; i < error.response.data.errors.length; i++) {
                                   notifyError(error.response.data.errors[i].defaultMessage);
                                 }
                               } else {
                                 notifyError(error.response.data.message);
                               }
                 })
        } else {
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => { 
                    atualizaImagem(response.data.id);
                    notifySuccess("Produto cadastrado com sucesso."); })
                .catch((error) => {
                      if (error.response.data.errors != undefined) {
                                for (let i = 0; i < error.response.data.errors.length; i++) {
                                   notifyError(error.response.data.errors[i].defaultMessage);
                                 }
                               } else {
                                 notifyError(error.response.data.message);
                               }
                    })
        }



    }
    const handleImagemChange = (event) => {

       const file = event.target.files[0];
       setImagem(file);

       // Gera uma URL para visualização da imagem
       if (file) {
           const reader = new FileReader();
           reader.onloadend = () => {
               setPreview(reader.result);
           };
           reader.readAsDataURL(file);
       } else {
           setPreview(null);
       }
};
function atualizaImagem(idProduto) {

		let formData = new FormData();
		formData.append('imagem', imagem);

		axios.post("http://localhost:8080/api/produto/" + idProduto, formData)
		.then((response) => {
			notifySuccess('Imagem cadastrada com sucesso.')
		})
		.catch((error) => {
			if (error.response) {
				notifyError(error.response.data.errors[0].defaultMessage)
			} else {
				notifyError(error.response.data.message)
			}
		})
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
                        <Form.Input
                               label="Imagem do Produto"
                               type="file"
                               accept="image/*"
                               onChange={handleImagemChange}
                           />

                           {preview && (
                               <Image src={preview} size="small" bordered style={{ marginTop: '1em' }} />
                           )}
                           {!preview && imagem && (
                               <Image src={`imagens_cadastradas/${imagem}`} bordered style={{ marginTop: '1em' }} />
                           )}

                           <br/>

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