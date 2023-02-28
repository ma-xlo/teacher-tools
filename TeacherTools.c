#include <stdio.h>
#include <stdlib.h>

int main() {

    printf("   ______                __                 ______            __    \n");
    printf("  /_  __/__  ____ ______/ /_  ___  _____   /_  __/___  ____  / /____\n");
    printf("   / / / _ \\/ __ `/ ___/ __ \\/ _ \\/ ___/    / / / __ \\/ __ \\/ / ___/\n");
    printf("  / / /  __/ /_/ / /__/ / / /  __/ /       / / / /_/ / /_/ / (__  ) \n");
    printf(" /_/  \\___/\\__,_/\\___/_/ /_/\\___/_/       /_/  \\____/\\____/_/____/\n\n");
    printf("  Checking updates... ");
    system("git pull\n");
    printf("\n");
    printf(" +-- Bem vindo(a) Teacher! -----------------------------------+\n");
    printf(" |                                                            |\n");
    printf(" | Servidor local da aplicacao inicializado com sucesso!      |\n");
    printf(" |                                                            |\n");
    printf(" | Endereco para acessa-lo: https://localhost:3000            |\n");
    printf(" | Feche a janela para encerrar.                              |\n");
    printf(" |                                                            |\n");
    printf(" +------------------------------------------------------------+\n\n");
    //getchar();

    system("start chrome  http://localhost:3000/");
    system("node ./app.js");
    return 0; 
}