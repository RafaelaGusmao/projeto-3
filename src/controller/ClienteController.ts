import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

/**
* A classe `ClienteController` estende a classe `Cliente` e é responsável por controlar as requisições relacionadas aos clientes.
* 
* - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "cliente".
* - Herdando de `Cliente`, ela pode acessar os métodos e propriedades da classe base.
*/
export class ClienteController extends Cliente {

    /**
     * Lista todos os clientes.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de clientes em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de clientes.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaDeClientes = await Cliente.listagemClientes();
            console.log(listaDeClientes);
            
            return res.status(200).json(listaDeClientes);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const clienteRecebido: ClienteDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoCliente = new Cliente(clienteRecebido.nome, clienteRecebido.cpf, clienteRecebido.telefone);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Cliente.cadastroCliente(novoCliente);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o cliente. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperar o ID do cliente a ser removido
            const idCliente = parseInt(req.params.idCliente as string);

            // chamar a função do modelo e armazenar a resposta
            const repostaModelo = await Cliente.removerCliente(idCliente);

            // verifica se a reposta do modelo foi verdadeiro (true)
            if(repostaModelo) {
                // retorma um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "O cliente foi removido com sucesso!"});
            } else {
                // retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o cliente. Entre em contato com o administrador do sistema." });
            }

        // trata qualquer erro que aconteça durante o processo
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do carro que será atualizado
            const idCliente = parseInt(req.query.id_carro as string);

            // recuperando as informações do carro que serão atualizadas
            const clienteRecebido: ClienteDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const clienteAtualizado = new Cliente(clienteRecebido.nome,
                clienteRecebido.cpf,
                clienteRecebido.telefone,
                
        );

            // setando o id do carro que será atualizado
            clienteAtualizado.setIdCliente(idCliente);

            // chamando a função de atualização de carro
            const resposta = await Cliente.atualizarCliente(clienteAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o cliente. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um clinte. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
    
}