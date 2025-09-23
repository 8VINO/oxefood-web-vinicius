import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { Button, Container, Divider, Form, Icon, Dropdown } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
export default function FormEntregador() {
    const [valueAtive, setValueAtive] = useState("n")
    const options = [
        { key: 'br', text: 'PE', value: 'br' },
        { key: 'sp', text: 'SP', value: 'sp' },
        { key: 'rj', text: 'RJ', value: 'rj' },
    ];

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [foneCelular, setFoneCelular] = useState("");
    const [foneFixo, setFoneFixo] = useState("");
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState(0);
    const [valorFrete, setValorFrete] = useState(0.0);
    const [enderecoRua, setEnderecoRua] = useState("");
    const [enderecoComplemento, setEnderecoComplemento] = useState("");
    const [enderecoNumero, setEnderecoNumero] = useState("");
    const [enderecoBairro, setEnderecoBairro] = useState("");
    const [enderecoCidade, setEnderecoCidade] = useState("");
    const [enderecoCep, setEnderecoCep] = useState("");
    const [enderecoUf, setEnderecoUf] = useState("");
    const [ativo, setAtivo] = useState(false);

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
        axios.post("http://localhost:8080/api/entregador",entregadorRequest)
        .then((response)=>{
             console.log('Entregador cadastrado com sucesso')
        })
        .catch((error)=>{
            console.log('Erro ao cadastrar um entregador', error.response ? error.response.data : error)
        })

    }
    return (

        <div style={{ marginTop: '3%' }}>
            <Container textAlign='justified'>
                <h2><span style={{ color: 'darkgray' }}>Entregador &nbsp;<Icon name='angle double right' size='small' /> </span>Cadastro </h2>

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
                                type='number'
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
                                value="y"
                                checked={valueAtive === "y"}
                                onChange={() => { setValueAtive('y'); setAtivo(true); }}
                            />
                            <Form.Radio
                                label="Não"
                                value="n"
                                checked={valueAtive === "n"}
                                onChange={() => { setValueAtive('n'); setAtivo(false); }}
                            />
                        </Form.Group>



                    </Form>
                    <div style={{ marginTop: '4%' }}>
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

                        <Button
                            type='button'
                            inverted
                            color='blue'
                            icon
                            circular
                            labelPosition='left'
                            floated='right' 
                            onClick={()=>salvar()}>
                            <Icon
                                name='save'
                            />
                            Salvar

                        </Button>
                    </div>

                </div>



            </Container>

        </div>

    );

}