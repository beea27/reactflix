import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000',
  };

  const { handleChange, values, clearForm }= useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  function handleSubmit(infosDoEvento) {
    infosDoEvento.preventDefault();
    setCategorias([
      ...categorias,
      values,
    ]);

    clearForm()  
  }

  useEffect(() => {
    console.log('fgbfbgfdmjgb');
    const URL = 'http://localhost:3000/categorias';
    fetch(URL)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      })
      .then((respostaConvertidaEmObjeto) => {
        console.log(respostaConvertidaEmObjeto);
      });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       "id": 1,
    //       "nome": "Front End",
    //       "descricao": "vcxbxfcvbnbcvmnc",
    //       "cor": "#cbd1ff"
    //     },
    //     {
    //       "id": 2,
    //       "nome": "Back End",
    //       "descricao": "fdgfgfg",
    //       "cor": "#cbd1ff"
    //     }
    //   ]);
    // }, 3 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {' '}
        {values.nome}
      </h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="text"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length ===0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => (
          <li key={`${categoria}${indice}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>

    </PageDefault>
  );
}

export default CadastroCategoria;
