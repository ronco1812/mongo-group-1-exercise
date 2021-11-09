const server = 'http://localhost:3001';
const body = document.getElementById("root");  
const phoneBook = createElement("div",[],["view-book"]);
const searchDiv = createElement('div',
[createElement('h3',[],[],{},'add/search/delete by name :'),
createElement('input',[],["search-name"],{'type' : 'text','placeholder' : 'enter name'}),
createElement('br'),
createElement('input',[],["search-number"],{'type' : 'text', 'placeholder' : 'enter number'}),
createElement('br'),
createElement('button',[],["search-name-button"],{},'search'),
createElement('button',[],["add"],{},'add'),
createElement('button',[],["delete"],{},'delete'),
],["search-div"])

body.append(phoneBook);
body.append(searchDiv); 
const getContacts = async () => {
    try {
        const { data } = await axios.get(`${server}/api/persons`);
        data.forEach((contact) => {
            const person = createElement('div',[],["view-person"],{'id': contact.id})
            const name = createElement('p');
            name.innerText = `name: ${contact.name}`;
            const number = createElement('p');
            number.innerText = `number: ${contact.number}`;
            person.append(`${contact.id}:`, name, number);
            phoneBook.append(person);
        })
    } catch (error) {
        body.innerText ='oops....something went wrong' + error.massage;
        
    }
}
function createElement(tagName ,children = [], classes = [], attributes = {},innerText) {
    const el = document.createElement(tagName);
            // Children
        for(const child of children) {
                el.append(child);
        }
            // Classes
        for(const cls of classes) {
                el.classList.add(cls);
        }
            // Attributes
        for (const attr in attributes) {
                el.setAttribute(attr, attributes[attr]);
        }
            if(innerText!=undefined)
            el.innerText=innerText;
            return el;
        }
getContacts()