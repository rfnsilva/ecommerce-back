import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Slider } from '../entity/Slider';

//retorna todos os slider
export const get_sliders = async(req: Request, res: Response) => {
  try{
      const sliders = await getRepository(Slider).find();
      
      return res.json(sliders);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao peagr todos os sliders' })
  }
}

//add slider
export const add_slider = async(req: Request, res: Response) => {
  try {
    const { url } = req.body;
    console.log(url)

    await getRepository(Slider).query(`
        INSERT INTO "slider"("url") VALUES ('${url}')  RETURNING "id", "url", "created_at", "updated_at"
    `);


    const sliders = await getRepository(Slider).find();
      
    return res.json(sliders);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add slider' })
  }
}


//deletar um slider no banco
export const del_slider = async(req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id)

  try {
      const resultado = await getRepository(Slider).delete(id);

      if (resultado.affected === 0) {
          console.log('sucesso ao deletar')

          return res.status(404).json({ message: 'erro ao deletar' })
      }
      console.log('sucesso ao deletar')

      const sliders = await getRepository(Slider).find();

      return res.json(sliders);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao deletar' })
  }
}

//edita um slider no banco
export const edit_slider = async(req: Request, res: Response) => {
  const id  = req.params.id;

  try{
      const resultado = await getRepository(Slider).update(id, req.body);

      if(resultado.affected === 0){
          return res.status(404).json({message: 'erro update'})
      }
      console.log('sucesso ao editar')

      const sliders = await getRepository(Slider).find();
      
      return res.json(sliders);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao update' })
  }
}
