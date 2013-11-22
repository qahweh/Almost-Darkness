package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.component.Eye;
import qahweh.almostdarkness.gamelogic.piece.component.FishEye;

/*

createHuman(Function function) //called from Game object. function defined in Game object.
{
    new Eye(function)
}

class Eye
{
    Function f;
    new Eye(Function f)
    {
        this.f=f;

---
    updateView()
    {
        f.run(); // this wouldn't work. function is using fields on Eye object and would not compile when defined in Game object.


*/

public class PieceFactory
{
    public static PieceI createHuman(PieceCallBack pcb)
    {
        final Human human = new Human(); //
        human.add(
            new Eye() //TODO: move logic to constructor
            {
                @Override
                public void updateView()
                {
                    human.pieceCallBack.updateView(human, this);
                    super.updateView();
                }
            }
        );
        return human;
    }

    public static PieceI createFishman(PieceCallBack pcb)
    {
        final FishMan fishman = new FishMan();
        if(true)return fishman;
        fishman.add(
            new FishEye() //TODO: move logic to constructor
            {
                @Override
                public void updateView()
                {
                    fishman.pieceCallBack.updateView(fishman, this);
                    super.updateView();
                }
            }
        );
        return fishman;
    }

    public static PieceI createDog(PieceCallBack pcb)
    {
        final Dog dog = new Dog();
        dog.add(
            new Eye() //TODO: move logic to constructor
            {
                @Override
                public void updateView()
                {
                    dog.pieceCallBack.updateView(dog, this);
                    super.updateView();
                }
            }
        );
        return dog;
    }
}
