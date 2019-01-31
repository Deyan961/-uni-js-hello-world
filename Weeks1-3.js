var events = [];
var clients = [];
var archivedEvents=[];

function insertEvent(name, access, date, price){
    var id;

    if (typeof name !== "string" ) {
        return;
    }
    if (events.length === 0) {
      id = 0;  
    }else{
        id = events[events.length - 1].id +1;       
    }
    name = access ?('# '+name):('* '+name);
    name = (price>0) ?('$ '+name):('! '+name);

    events.push({id, name, access, date, price,clients:[],rating:0});
}
function insertClient(firstName, lastName, gender, age,money){

    clients.push({firstName, lastName, gender, age, money,vipPoints:0});
}

function redactionEvent(eventID, name, access, date, price){
    var event;
    for (let i = 0; i < events.length; i++) {
    if (events[i].id === eventID) {
       event = events[i];       
    } 
    }
    event.name = (typeof name === "string")?name: events.name;
    event.access = (typeof access === "boolean")?access: events.access;
    event.date = (date instanceof Date)?date: events.date;
    event.price = (typeof price === "number")?price: events.price;
}
function removeEvent(eventID){
    var index;
    for (let i = 0; i < events.length; i++) {
    if (events[i].id === eventID) {
       index = i;       
    } 
    }
    events.splice(index, 1);

}
function clientRemover(event, client){
    var index = event.clients.indexOf(client);
    event.clients.splice(index,1);

}
function insertClientToEvent(event, client){
    if(event.access){
        if(client.vipPoints===5){
            client.vipPoints=0;
        }else{
            if(client.money<event.price){
                console.log('not enaugh money')
                return;
            }
            client.money=client.money-event.price;
            client.vipPoints++;
        }
        event.clients.push(client);
        return;
    }
   if(client.age >= 18){
        if(client.vipPoints===5){
            client.vipPoints=0;
        }else{
            if(client.money<event.price){
                console.log('not enaugh money')
                return;
            }
            client.money=client.money-event.price;
            client.vipPoints++;
        }
        event.clients.push(client);
        return;
   }
   console.log("client not fit")
}
function outputEventsWithMostClients(){
    var maxClientsLenght=0;
    var eventsWitheMostClients = [];
    for (let i = 0; i < events.length; i++) {
        if(maxClientsLenght < events[i].clients.length){
            maxClientsLenght = events[i].clients.length;
        }    
    }
    for (let i = 0; i < events.length; i++) {
       if(events[i].clients.length===maxClientsLenght)
       eventsWitheMostClients.push(events[i]);
    }
    if(events.length !== eventsWitheMostClients.length){
        for (let i = 0; i < eventsWitheMostClients.length; i++) {
            console.log("event name is : "+eventsWitheMostClients[i].name);      
        }
        return;
    }
    console.log('event with most client does not exist');

}
function insertRating(client, event, rating){
        if(archivedEvents.indexOf(event) === -1){
            console.log('event dose not exist in archived events ');
            return;
        }
        if( rating< 1|| rating> 10){
        console. log( 'rating must be between 1-10');
        return;
        }
        for ( let i = 0; i < event. votedClients.length; i++) {
        if( event. votedClients[i] === client){
        console. log( 'you already vote');
        return;
        }
        event.votedClients.push(client);
        if( event. rating === 0){
        event. rating= (rating* 3)/ 5;
        return;
        }
        event.rating=( event.rating + ((rating* 3)/ 5))/ 2;
        }
}
function archiveEvent(event){
  var index =events.indexOf(event);
  var archiveEvent=events.splice(index,1);
  archiveEvent[0].name = '~ '+archiveEvent[0].name;
  archiveEvent[0].votedClients=[];
  archivedEvents.push(archiveEvent[0]);
  
}
function outputEventClients(event){
    for (let i = 0; i < event.clients.length; i++) {
        console.log(event.clients[i]);
        
    }

}
function outputEvent(){
    for (let i = 0; i < events.length; i++) {
        var access=events[i].access? 'free':'18+';
        console.log(events[i].name + " / "+access+' / '+events[i].date+' / '+events[i].price);
        
    }
}

insertEvent('alisia',false,new Date(),6.00);
insertEvent('alisia12',true,new Date(),2.00);
insertEvent('alisia3',true,new Date(),9.00);
insertEvent('alisia5',false,new Date(),8.00);
insertEvent('kaloria',true,new Date(),4.00);
insertEvent('alisia8',false,new Date(),3.00);
outputEvent();

insertClient('Mr.', 'Bean', 'male', 18, 100);
insertClient('Ave', 'Ceaser', 'male', 222, 1002);
insertClient('Tinki-', 'Winkey', 'male', 11, 5);
insertClient('J.J', 'JR', 'male', 23, 10);
insertClient('Dr.', 'Snowite', 'female', 18, 20);
insertClient('Shreck.', 'Green', 'male', 33, 100);
insertClient('Seto.', 'Caiba', 'male', 5, 100);
insertClient('neymar.', ' ', 'female', 55, 10000);


insertClientToEvent(events[5], clients[2]);
insertClientToEvent(events[2], clients[6]);
insertClientToEvent(events[2], clients[5]);
insertClientToEvent(events[5], clients[3]);
insertClientToEvent(events[1], clients[2]);

outputEventClients(events[5]);
outputEventClients(events[2]);
outputEventClients(events[1]);

archiveEvent(events[5]);
insertRating(clients[2], events[1], 5);


console.log(clients);
console.log(archivedEvents);
outputEventsWithMostClients();


redactionEvent(events[2].id, "se4ko", false, new Date, 8.00);
removeEvent(events[3]);
clientRemover(events[1], clients[2]);

outputEvent();

