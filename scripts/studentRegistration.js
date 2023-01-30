import fs from "fs"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const date = new Date();
const day = date.getDate();
const month = months[date.getMonth()];
const year = date.getFullYear();



export default function registry(data){

    const {
        firstName, lastName, occupation,
        maritalStatus, genre, cpf, rg, address,
        addressNumber, postalCode, courseDuration,
        numberOfLessons, startDate, endDate, startHour,
        endHour, totalPrice, writeInFull, payday, installments, payments } = data;

    fs.open(path.join(__dirname, '..', 'temp', 'document.html'), 'w', (err) => {
        if (err) throw err;
    });

    const contract = `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
            *{
                background:transparent !important;
                color:#000 !important;
                text-shadow:none !important;
                filter:none !important;
                -ms-filter:none !important;
            }
            body{
                margin: 0px;
                width: 100%;
                height: 100vh;
                font-weight: 900;
            }
            h1{
                font: bold 11pt Arial;
                color: #000;
                text-align: center;
            }
            p { 
                color: #000;
                text-align:justify;
                font: 11pt Arial;
                line-height: 1.5;
                text-indent: 50px;
                widows: 1;
                orphans: 1;

            }
            .sections{
                margin: auto;
                border: 1px solid rgb(46, 46, 46);

            }
            .document-header{
                text-align: right;
            }

            .signature-section{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                padding: 20px;

            }

            .signature{
                flex: 1;
                font: 11pt Arial normal;
                text-align: center;
                border-top: 1px solid black; 
                padding: 5px;
                margin-top: 50px;
            }

            .signature:first-child{
                margin-right: 50px;
            }

            img{
                width: 110px;
            }

            @media print{
                @page{
                    size: A4 portrait;
                    margin: 3cm;
                    margin-top: 1.5cm;

                    @top-right{
                        content: "Header"
                    } 
                } 
            }

        </style>
        <title>Document</title>
    </head>

    <body media="print">
        <div class="document-header">
            <img  src="../img/logo.png" alt="">
        </div>
        <br>
        <h1 style="line-height: 1.5;">CONTRATO DE PRESTAÇÃO DE<br>SERVIÇOS DE ENSINO DE LÍNGUA<br> ESTRANGEIRA</h1>
        <br>

        <div class="sections">
            <h1>DAS PARTES</h1>
        </div>
        <p><strong>CONTRATANTE:</strong> ${firstName} ${lastName}, ${occupation}, ${maritalStatus}, inscrito no CPF/MF nº ${cpf}, e portador da cédula de identidade RG nº ${rg}, residente e domiciliado no endereço ${address}, nº ${addressNumber}, CEP nº${postalCode}.</p>
        <p><strong>CONTRATADA:</strong> TEACHER LU SCHOOL, sob CNPJ nº 37.569.697/0001-26, localizada na cidade de Jacareí/SP, representada pela sua sócia Luciana Rodrigues Costa, portadora do CPF nº 385.168.188-61, residente e domiciliada à rua Benedito Marcolino de Souza, 46, bairro Jardim do Portal, CEP nº 12324-280, Jacareí/SP.</p>
        <p>As partes acima identificadas têm, entre si, justo e acertado, o presente Contrato de Prestação de Serviços de Ensino de Língua Inglesa, que será regido pelas cláusulas a seguir, bem como pelas condições nelas descritas.</p>
        <br>

        <div class="sections">
            <h1>DO OBJETO DO CONTRATO</h1>
        </div>
        <p><strong>CLÁUSULA PRIMEIRA:</strong> O presente instrumento tem como objeto a prestação dos serviços de ensino relativo ao idioma inglês a ser ministrado pela contratada ao contratante.</p>
        <p><strong>Parágrafo único:</strong> No término da prestação de serviço, será entregue ao CONTRATANTE, certificado de conclusão de curso devendo ser solicitado por este, tendo a CONTRATADA o prazo de 15 (quinze) dias para realizar a entrega, a contar da data da solicitação. </p>    
        <p><strong>CLÁUSULA SEGUNDA:</strong> Serão utilizados materiais complementares, a serem definidos pela contratada e previamente sinalizados ao contratante, caso queira adquirir apostilas e livros.</p>
        <br>

        <br>
        <div class="sections">
            <h1>DO PRAZO DO CURSO</h1>
        </div>
        <p><strong>CLÁUSULA TERCEIRA:</strong> O curso terá tempo de duração de ${courseDuration} meses, distribuídos em ${numberOfLessons} aulas, com início em ${startDate} e termino ${endDate}.</p>
        <p><strong>CLAUSULA QUARTA:</strong> Caso necessário, o presente contrato poderá ser renovado em bloco de aula de igual termo mediante aditivo contratual.</p>
        <br>

        <div class="sections">
            <h1>DAS MINISTRAÇÕES</h1>
        </div>
        <p><strong>CLÁUSULA QUINTA:</strong> As aulas terão uma hora de duração, iniciando as ${startHour} e finalizando as ${endHour}, toda (semana).</p>
        <p><strong>Parágrafo único:</strong> O tempo de tolerância por atraso será de 10 (dez) minutos, de modo que, caso o CONTRATANTE não compareça dentro deste prazo, será considerado como aula dada, sem possibilidade de reposição, em virtude do CONTRATADO designar aquele horário para ministração da aula.</p>
        <p><strong>CLÁUSULA SEXTA:</strong> Se por algum motivo o CONTRATANTE precisar cancelar, ou remanejar a aula para outra data, deverá comunicar previamente o CONTRATADO para verificar disponibilidade na agenda, devendo o CONTRATANTE sinalizar a necessidade com no mínimo 24 horas de antecedência.</p>
        <p><strong>Parágrafo único:</strong> Caso o CONTRATANTE não sinalize a necessidade de alterar o dia da aula designada dentro do prazo de 24 horas, será reconhecido como aula dada, sem direito a reposição.</p>
        <p><strong>CLÁUSULA SÉTIMA:</strong> Na hipótese em que o CONTRATANTE realizar o cancelamento da aula designada dentro do prazo estabelecido no parágrafo único da cláusula sexta, deverá reagendar a reposição no prazo máximo de 15 (quinze) dias a contar da data do cancelamento, devendo considerar a disponibilidade do CONTRATADO.</p> 
        <br>

        <div class="sections">
            <h1>DAS AULAS EXTRAS</h1>
        </div>
        <p><strong>CLÁUSULA OITAVA:</strong> Caso a parte CONTRATANTE deseje realizar a contratação de aulas extras para complementar o curso ministrado deverá entrar em contato diretamente com o CONTRATADO para ajustarem valores e formas de pagamento, bem como horários disponíveis.</p>
        <p><strong>Parágrafo único:</strong> As aulas extras também terão 60 minutos de duração, podendo ser contratadas até duas aulas seguidas.</p>
        <br>

        <div class="sections">
            <h1>DO PAGAMENTO</h1>
        </div>
        <p><strong>CLÁUSULA NONA:</strong> Pela prestação de serviço contratado, o CONTRATANTE pagará à CONTRATADA o valor total de R$${totalPrice} (${writeInFull}) a ser pago em ${installments} prestações de R$${payments}.</p>
        <p><strong>Parágrafo único:</strong> Os pagamentos terão o dia ${payday} como vencimento das prestações.</p>
        <br>

        <div class="sections">
            <h1>DA MORA</h1>
        </div>
        <p><strong>CLAUSULA DECIMA:</strong> Caso haja o atraso no pagamento da prestação estabelecida por parte do CONTRATANTE, incidirá sobre o valor da parcela juros de 1% ao mês e multa de 2%.</p>
        <p><strong>Parágrafo primeiro:</strong> Além dos juros e multa previstos na hipótese de atraso no pagamento, poderá o valor da parcela ser reajustado conforme correção monetária atualizadas pelos índices do TJSP.</p>
        <p><strong>Parágrafo segundo:</strong> Caso seja preciso entrar com ação judicial de cobrança, incidirá sobre o valor em atraso, custas e despesas processuais, bem como honorários advocatícios. </p>
        <br>

        <div class="sections">
            <h1>DA RESCISÃO</h1>
        </div>
        <p><strong> CLÁUSULA DECIMA PRIMEIRA:</strong> O presente contrato poderá ser rescindido por qualquer das partes, sendo obrigatória a comunicação prévia de 15 dias.</p>
        <p><strong> CLAUSULA DECIMA SEGUNDA:</strong> Caso a rescisão ocorra após o prazo de arrependimento previsto no art. 49 do Código de defesa do consumidor, caberá ao CONTRATANTE o pagamento de multa de 25% sobre as parcelas restantes.</p>
        <p><strong> CLAUSULA DECIMA TERCEIRA:</strong> Caso a parte CONTRATANTE tenha, no ato da rescisão, adiantado parcelas à parte CONTRATADA caberá a devolução de 1/3 do valor adiantado descontados o percentual mencionado na clausula decima segunda.</p>
        <br>

        <div class="sections">
            <h1>DAS CLAUSULAS GERAIS</h1>
        </div>
        <p><strong>CLÁUSULA DECIMA QUARTA:</strong>Quaisquer despesas, seja a que título for, como por exemplo, copia, xerox, impressões, não fazem parte do presente contrato, devendo o contratante adquirir ou pagar o valor correspondente.</p>
        <p><strong>CLÁUSULA DÉCIMA QUINTA:</strong>O contratante declara ciência de que, como em qualquer área acadêmica, o sucesso do ensino depende da aplicação, dedicação e comprometimento do aluno, tanto em aula, como fora dela, sendo necessário, também, estudo contínuo, de acordo com a pretensão do interessado.</p>
        <br>

        <div class="sections">
            <h1>DO FORO</h1>
        </div>
        <p><strong>CLÁUSULA DÉCIMA SEXTA:</strong> Por estarem assim, justos e contratados, nomeiam como foro de JACAREÍ para dirimir eventuais litígios quer, porventura, vinculem as partes.</p>
        <p>Por estarem de acordo, firmam o presente instrumento.</p>

        <br>
        <br>
        <br>
        <h1>Jacareí, ${day} de ${month} de ${year}.</h1>

        <div class="signature-section">
            <div class="signature">CONTRATANTE</div>
            <div class="signature">CONTRATADA</div>
        </div>
        <br>
        <br>
        <br>

        <script>
            window.print();
        </script>
    </body>

</html>
    
`
    fs.writeFileSync(path.join(__dirname, '..', 'temp', 'document.html'), contract);
}