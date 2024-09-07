let cadastro = {};
    
    let cadastrar = () => interface(`
     Coordenada Norte: <input id="norte" size="3"><br />
     Coordenada Leste: <input id="leste" size="3"><br />
     Texto: <br />
     <textarea id="texto" rows="10" cols="30"></textarea>
     <br />
     <button onclick="inserir()" id="Incluir1">Incluir</button>
    `);
    
    let convertePosicao = p => (p.n<0?"S":"N") + Math.abs(p.n) + (p.l<0?"O":"L") + Math.abs(p.l);
      
    let inserir = () => {
        let n = document.getElementById("norte").value;
        let l = document.getElementById("leste").value;
        let texto = document.getElementById("texto").value;
        
        cadastro = {...cadastro, [convertePosicao({n:n, l:l})]: texto};
        console.log(cadastro); // Para verificar o conteúdo do cadastro no console
    }
    
    let exportar = () =>
      interface(`
          <textarea id="cadastro" rows="10" cols="50">${JSON.stringify(cadastro, null, 2)}</textarea><br />
          <button onClick="importar()" id="importar1">Importar</button>
          `);

    let importar = () => {
      cadastro = JSON.parse(document.getElementById('cadastro').value);
      posicao = {n:0,l:0};
      jogar();
    }

    let interface = html => document.getElementById("interface").innerHTML = html;
    let alerta = mensagem => alert("a mensagem é " + mensagem);
    
    let posicao = {n:0,l:0}
    
    let exibe = (msg) => document.getElementById("texto").innerHTML = `<br /><span style='color:red'>${msg}</span><br />${cadastro[convertePosicao(posicao)]}`;
    
    let move = (n,l) => {
      let msg = "";
      let novaPosicao = {n: posicao.n+n, l: posicao.l+l}
    ;
      if( cadastro[convertePosicao(novaPosicao)] ) {
         posicao = novaPosicao;
      } else {
        msg = "Não foi Possível ir nessa direção!";
      }
      exibe(msg);
    }
    
    let jogar = () => {
      interface(`
        <button onClick="move(1,0)" id="norte1">Norte</button>
        <button onClick="move(-1,0)" id="sul1">Sul</button>
        <button onClick="move(0,1)" id="leste1">Leste</button>
        <button onClick="move(0,-1)" id="oeste1">Oeste</button>
        <br />
        <div id="texto"></div>
        
          `);
          exibe('');
    }