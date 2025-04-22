
           //criando a gaveta para armazenar
           let caixaDeTarefas = JSON.parse(localStorage.getItem('caixaDeTarefas')) || [];

            document.querySelector('form').addEventListener('submit',function(event){
            event.preventDefault();
            alert('adiconado com sucesso!');
            let input_text_add =  document.getElementById('input_todo').value;
            console.log(input_text_add)
            //salvar no LocalStore a nova tarefa quando usuario criar
            let addNovaTarefa = {
                tarefa: input_text_add,
                concluir: false
            }
            //adicionando nova tarefa no array
            caixaDeTarefas.push(addNovaTarefa)
            //localstorage.setItem() - salvar o array inteiro , Json.stringify() - converte o array em string
            localStorage.setItem('caixaDeTarefas',JSON.stringify(caixaDeTarefas));

            let elementAdd =  document.createElement('li');
            elementAdd.innerHTML = input_text_add;
            document.getElementById('lista-todo').append(elementAdd);
            let botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover'; 
            elementAdd.append( botaoRemover);
            botaoRemover.addEventListener('click', function(){
                elementAdd.remove();
                console.log('removido com sucesso')
            })
            //criando um botao conlcluirdo do lado de remover de cada tarefa
            let botaoConcluir = document.createElement('button');
            botaoConcluir.textContent = 'Concluir';
            elementAdd.append(botaoConcluir);

            //adicionando um evento no botao concluir
            botaoConcluir.addEventListener('click', function(){
            //adicionando estilos ao clicar concluir e removendo botoes após interagirem 
                elementAdd.style.textDecoration = 'line-through'; 
                elementAdd.style.color = 'green';
                elementAdd.style.fontWeight = 'bold';
                botaoConcluir.remove();
                botaoRemover.remove();
                console.log('tarefa concluida com sucesso!')

            })

            })

            //criando a função para carregar dados
            function carregarTarefas() {
                let lista = document.getElementById('lista-todo')
                 lista.innerHTML = ""; // limpa antes de adicionar
                let caixaDeTarefas = JSON.parse(localStorage.getItem('caixaDeTarefas')) || [];

                caixaDeTarefas.forEach(function(tarefa) {
                    console.log(tarefa.tarefa);

                    let item = document.createElement('li');
                    item.textContent = tarefa.tarefa


                    let botaoRemover = document.createElement('button');
                    botaoRemover.textContent = 'Remover';
                    botaoRemover.addEventListener('click', function(){
                        item.remove();

                        //remover do array - atualiza
                        caixaDeTarefas = caixaDeTarefas.filter(t => t.tarefa !== tarefa.tarefa)
                        atualizarLC(caixaDeTarefas);
                    })

                    let botaoConcluir = document.createElement('button');
                    botaoConcluir.textContent = 'Concluir';
                    botaoConcluir.addEventListener('click', function(){
                        item.style.textDecoration = 'line-through'; 
                        item.style.color = 'green';
                        item.style.fontWeight = 'bold';
                        botaoConcluir.remove();
                        botaoRemover.remove();
                        console.log('tarefa concluida com sucesso!')

                        if (tarefa.concluir) {
                        item.style.textDecoration = 'line-through'; 
                        item.style.color = 'green';
                        item.style.fontWeight = 'bold';
                        botaoConcluir.remove();
                        botaoRemover.remove();
                        }

                        //atualizar
                        const index = caixaDeTarefas.findIndex(t => t.tarefa === tarefa.tarefa)
                        if(index !== -1) {
                            caixaDeTarefas[index].concluir = true;
                            atualizarLC(caixaDeTarefas);
                        }
                    })
                    
                    //mostrar elementos na tela
                    item.appendChild(botaoRemover);
                    item.appendChild(botaoConcluir);
                    lista.appendChild(item);

                })
            }
            window.onload = carregarTarefas;

            //função atualizar o localStorege
            function atualizarLC(caixaDeTarefas) {
                localStorage.setItem('caixaDeTarefas', JSON.stringify(caixaDeTarefas));

            }
            