import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCarro: number,
    idCliente: number,
    dataPedido: Date,
    valorPedido: number
}


/**
 * A classe `PedidoVendaController` estende a classe `PedidoVenda` e é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 * - Herdando de `PedidoVenda`, ela pode acessar os métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
    }
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const PedidoVendaRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoPedidoVenda = new PedidoVenda(PedidoVendaRecebido.idCarro, PedidoVendaRecebido.idCliente, 
                                    PedidoVendaRecebido.dataPedido, PedidoVendaRecebido.valorPedido);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedidoVenda(novoPedidoVenda);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido de Venda cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o Pedido de Venda. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Pedido de Venda. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperar o ID do cliente a ser removido
            const idPedidoVenda = parseInt(req.params.idPedidoVenda as string);

            // chamar a função do modelo e armazenar a resposta
            const repostaModelo = await PedidoVenda.removerPedidoVenda(idPedidoVenda);

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
            // recuperando o id do cliente que será atualizado
            const idCliente = parseInt(req.query.id_cliente as string);

            // recuperando as informações do cliente que serão atualizadas
            const PedidoVendaRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo cliente com as informações recebidas
            const PedidoVendaAtualizado = new PedidoVenda(PedidoVendaRecebido.idCarro,
                PedidoVendaRecebido.idCliente,
                PedidoVendaRecebido.dataPedido,
            PedidoVendaRecebido.valorPedido);

            // setando o id do carro que será atualizado
            PedidoVendaAtualizado.setIdPedido(idCliente);

            // chamando a função de atualização de cliente
            const resposta = await PedidoVenda.atualizarPedidoVenda(PedidoVendaAtualizado);

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
            console.log(`Erro ao atualizar um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
    
}

