import { Router, Request, Response } from 'express';

import { register, login, add_cart, get_user, delete_cart } from './controllers/UserController';
import { get_produtos_destaque } from './controllers/ProdutoController';
import { get_marcas, get_marca } from './controllers/MarcaController';
import { login_admin, register_admin } from './controllers/AdminController';
import { get_sliders, add_slider, del_slider, edit_slider } from './controllers/AdminSliderController';
import { get_vendas, get_top_vendas, get_qtd_vendas, add_vendas_admin_cliente, add_vendas_admin, del_venda, edit_venda } from './controllers/AdminVendaController';
import { get_marcas_admin, get_marca_id, add_marca_admin, del_marca, edit_marca } from './controllers/AdminMarcaController';
import { get_fornecedor_id, get_fornecedores, add_fornecedor, del_fornecedor, edit_fornecedor } from './controllers/AdminFornecedorController';
import { get_produto_id, get_qtd_produtos, comprar_produto, get_produtos, add_produto_admin, del_produto, edit_produto } from './controllers/AdminProdutoController';
import { get_contas, pagar_conta, get_sum_contas } from './controllers/AdminContaController';

import cors from 'cors'
import { auth } from './middlewares/auth';

const routes = Router();

routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

//autênticação
routes.post('/register', register); //feito
routes.post('/login', login); //feito
routes.post('/login_admin', login_admin); //feito
routes.post('/register_admin', register_admin); //feito

//home page
routes.get('/get_produtos_destaque', get_produtos_destaque); //feito
routes.get('/get_marcas', get_marcas); //feito
routes.get('/get_user/:id', get_user); //feito
routes.get('/get_marca/:id', get_marca); //feito
routes.get('/get_sliders', get_sliders); //feito


//middleware autenticacao
routes.use(auth); //feito

routes.post('/add_cart', add_cart); //feito
routes.get('/get_user/:id', get_user); //feito
routes.delete('/delete_cart/:user_id/:produto_id', delete_cart); //feito

//FORNECEDORES
routes.get('/get_fornecedores', get_fornecedores); //feito
routes.get('/get_fornecedor_id/:id', get_fornecedor_id); //feito
routes.post('/add_fornecedor', add_fornecedor); //feito
routes.delete('/del_fornecedor/:id', del_fornecedor); //feito
routes.put('/edit_fornecedor/:id', edit_fornecedor); //feito

//SLIDERS
routes.post('/add_slider', add_slider); //feito
routes.delete('/del_slider/:id', del_slider); //feito
routes.put('/edit_slider/:id', edit_slider); //feito

//PRODUTOS
routes.get('/get_produtos', get_produtos); //feito
routes.get('/get_produto_id/:id', get_produto_id); //feito
routes.post('/add_produto_admin', add_produto_admin); //feito
routes.delete('/del_produto/:id', del_produto); //feito
routes.put('/edit_produto/:id', edit_produto); //feito
routes.post('/comprar_produto/:id', comprar_produto); //feito
routes.get('/get_qtd_produtos', get_qtd_produtos); //feito

//MARCAS
routes.get('/get_marcas', get_marcas_admin); //feito
routes.get('/get_marca_id/:id', get_marca_id); //feito
routes.post('/add_marca_admin', add_marca_admin); //feito
routes.delete('/del_marca/:id', del_marca); //feito
routes.put('/edit_marca/:id', edit_marca); //feito

//CONTAS
routes.get('/get_contas', get_contas);  //feito
routes.get('/get_sum_contas', get_sum_contas);  //feito
routes.put('/pagar_conta/:id', pagar_conta);  //nao usado ainda

//VENDAS
routes.get('/get_vendas', get_vendas);  //feito
routes.post('/add_vendas_admin', add_vendas_admin); //feito
routes.post('/add_vendas_admin_cliente/:id', add_vendas_admin_cliente); //feito
routes.delete('/del_venda/:id', del_venda); //feito
routes.put('/edit_venda/:id', edit_venda); //feito
routes.get('/get_qtd_vendas', get_qtd_vendas); //feito
routes.get('/get_top_vendas', get_top_vendas); //feito


export default routes;