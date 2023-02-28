#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <locale.h>

int main() {

    setlocale(LC_ALL, "");

    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_SCREEN_BUFFER_INFO consoleInfo;
    WORD saved_attributes;

    /* Save current attributes */
    GetConsoleScreenBufferInfo(hConsole, &consoleInfo);
    saved_attributes = consoleInfo.wAttributes;

    SetConsoleTextAttribute(hConsole, 13);
    
    printf("   ______                __                 ______            __    \n");
    printf("  /_  __/__  ____ ______/ /_  ___  _____   /_  __/___  ____  / /____\n");
    printf("   / / / _ \\/ __ `/ ___/ __ \\/ _ \\/ ___/    / / / __ \\/ __ \\/ / ___/\n");
    printf("  / / /  __/ /_/ / /__/ / / /  __/ /       / / / /_/ / /_/ / (__  ) \n");
    printf(" /_/  \\___/\\__,_/\\___/_/ /_/\\___/_/       /_/  \\____/\\____/_/____/\n\n");

    SetConsoleTextAttribute(hConsole, 15);

    printf(" Checking updates... ");
    system("git pull");

    printf("\n");
    printf(" +-- ");
    SetConsoleTextAttribute(hConsole, 3);
    printf("Bem vinda, Teacher Lu!");
    SetConsoleTextAttribute(hConsole, 15);
    printf(" -------------------------------------+\n");
    printf(" |                                                               |\n");
    printf(" | O servidor local da aplicação foi inicializado com sucesso!   |\n");
    printf(" |                                                               |\n");
    printf(" | Endereço de acesso: https://localhost:3000                    |\n");
    printf(" | Feche a janela para encerrar o servidor local.                |\n");
    printf(" |                                                               |\n");
    printf(" +---------------------------------------------------------------+\n\n");

    SetConsoleTextAttribute(hConsole, saved_attributes);

    system("start chrome  http://localhost:3000/");
    system("node ./app.js");

    return 0; 
}