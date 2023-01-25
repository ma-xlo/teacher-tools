#include <stdio.h>
#include <stdlib.h>

int main() {

    int option, day = 0;
    char months[3][12] = {"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"};
    int month;
    int ano = 2023;
    
    printf(" ___________________________________\n");
    printf("|                                   |\n");
    printf("|          Calendar Manager         |\n");
    printf("|___________________________________|\n");
    printf("|                                   |\n");
    printf("| [1] Uma vez por semana            |\n");
    printf("| [2] Duas vezes por semana         |\n");
    printf("|___________________________________|\n\n");
    printf("             Opcao: ");
    scanf("%d", &option);
    
    system("clear");
    printf("\n");

    printf("Mês: ");
    scanf("%d", &month);
    printf("\n");

    printf("Inicio das aulas: ");
    scanf("%d", &day);
    
    switch(option){
        
        case 1:

            for(int i = 0; i < 12; i++) {

                printf("\n%s/%d\n", months[month + 1], ano);
                printf("+----------+---------------+-----------+\n");
                printf("| Day      | Meetings      | Hours     |\n");
                printf("-----------+---------------+-----------+\n");

                while(1){
                    printf("| %2d       |               |           |\n", day);
                    printf("-----------+---------------+-----------+\n");
                    
                    if(day <= 23) { 
                        day += 7;
                        
                    } else {
                        break;
                    }
                }

                month++;
            }

            break; 
    }
    
    
    return 0;
}