import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { useState, useEffect } from 'react';
import { Button, Container, Divider, Dropdown, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";
export default function FormEntregador() {
    const options = [
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

    ];

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [ativo, setAtivo] = useState(false);


    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id);
                    setNome(response.data.nome);
                    setCpf(response.data.cpf);
                    setRg(response.data.rg);
                    setDataNascimento(formatarData(response.data.dataNascimento));
                    setFoneCelular(response.data.foneCelular);
                    setFoneFixo(response.data.foneFixo);
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
                    setValorFrete(response.data.valorFrete);
                    setEnderecoRua(response.data.enderecoRua);
                    setEnderecoComplemento(response.data.enderecoComplemento);
                    setEnderecoNumero(response.data.enderecoNumero);
                    setEnderecoBairro(response.data.enderecoBairro);
                    setEnderecoCidade(response.data.enderecoCidade);
                    setEnderecoCep(response.data.enderecoCep);
                    setEnderecoUf(response.data.enderecoUf);
                    setAtivo(response.data.ativo);

                })
        }
    }, [state])
    function salvar() {


        let entregadorRequest = {

            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo

        }
        if (idEntregador != null) {
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log("Erro ao atualizar entregador", error.response ? error.response.value : error) })
        } else {
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { console.log('Entregador cadastrado com sucesso.') })
                .catch((error) => { console.log("Erro ao atualizar entregador", error.response ? error.response.value : error) })
        }
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    return (
        <div>
            <MenuSistema tela={"entregador"} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />
                    <div style={{ marginTop: '4%' }}>

                        <Form >
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Nome'
                                    required
                                    maxLength={100}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input fluid label='CPF' required>
                                    <InputMask
                                        mask='999.999.999-99'
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    required
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input fluid label='DT Nascimento' required>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input fluid label='Fone Celular' required>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input fluid label='Fone Fixo'>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type='number'
                                    min={0}
                                    step={1}
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(Number(e.target.value))}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    type='number'
                                    min={0}
                                    step={0.01}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(Number(e.target.value))}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    type='number'
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={7}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={7}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={2}
                                    value={enderecoCep}
                                    onChange={e => setEnderecoCep(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Field>
                                <label>UF</label>
                                <Dropdown
                                    placeholder='Selecione'
                                    fluid
                                    selection
                                    options={options}
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                />
                            </Form.Field>

                            <Form.Input
                                fluid
                                label='Complemento'
                                value={enderecoComplemento}
                                onChange={e => setEnderecoComplemento(e.target.value)}
                            />

                            <Form.Group>
                                <label style={{ fontWeight: 'bold' }}>Ativo:</label>
                                <Form.Radio
                                    label="Sim"
                                    value={true}
                                    checked={ativo === true}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />
                                <Form.Radio
                                    label="Não"
                                    value={false}
                                    checked={ativo === false}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />
                            </Form.Group>



                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Link to='/list-entregador'>
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

    );

}