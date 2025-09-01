class Animal {
    String name;
    Animal(this.name);

    void speak(){
       print("$name makes a sound");
    }
}


main(){
  Animal("Dog");
}