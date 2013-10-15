#include <iostream>
using namespace std;
/*
#include <SDL/SDL.h>
#include <SDL/SDL_net.h>
*/

int main()
{
    cout << endl;
    cout << "Almost honest server" << endl;;
    int port;
    int numberOfPlayers;
    cout << "What port: "; cin >> port;
    cout << "Number of players: "; cin >> numberOfPlayers;

/*
    Some test code:
    SDL_Init(SDL_INIT_EVERYTHING);
    SDLNet_Init();

    IPaddress ip;
    SDLNet_ResolveHost(&ip,NULL,port);

    TCPsocket server = SDLNet_TCP_Open(&ip);
    TCPsocket client;
    const char* data = "test";
    while(1)
    {
        client = SDLNet_TCP_Accept(server);
        if(client)
        {
            SDLNet_TCP_Send(client,data,strlen(data)+1);
            SDLNet_TCP_Close(client);
            break;
        }
    }
    SDLNet_TCP_Close(server);

    SDLNet_Quit();
    SDL_Quit();
*/
}
