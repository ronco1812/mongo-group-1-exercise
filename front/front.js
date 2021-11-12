const server = 'http://localhost:3001/';
const body = document.getElementById("root");  
const phoneBook = document.getElementById("phone-book");
const getContacts = async () => {
    try {
        const { data } = await axios.get(`${server}api/persons`);
        data.forEach((contact) => {
            const person = createElement('div',[],["view-person"])
            const name = createElement('p');
            name.innerText = `name: ${contact.name}`;
            const number = createElement('p');
            number.innerText = `number: ${contact.number}`;
            person.append(name, number);
            phoneBook.append(person);
        })
    } catch (error) {
        body.innerText ='oops....something went wrong' + error.massage;
        
    }
}
const newContact = async() => {
    
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    if(name && number){
        try {
            axios.post(`${server}api/persons`,{
                content:{
                    name: name,
                    number: number,
                }
            }).then(() => alert('new contact has been added'))
        } catch (error) {
            alert('oops....something went wrong' + error.massage)
        }
    }
    else{alert('please enter name and number');}
    
}
const deleteContact = async() => {
    const name = document.getElementById("name").value;
    if(name){
        try {
            const {answer} = await axios.delete(`${server}api/persons/${name}`)
            console.log(answer);
            getContacts();
            alert(`${answer} has been deleted successfully`);
            
        } catch (error) {
            console.log(error);
            alert('oops something went wrong' +error.massage);
            
        }

        
        
    }
    
}
const updateContact = async() =>{
    const Cname = document.getElementById("current-name").value;
    const name = document.getElementById("up-name").value;
    const number = document.getElementById("up-number").value;
    if(name&&number&&Cname){
        try {
            axios.put(`${server}api/person/${Cname}`,{
                content:{
                    name: name,
                    number: number
                }
            }).then(alert(`${Cname} has been updated to ${name} and ${number}`))
        } catch (error) {
            alert(`oops.....something went wrong` + error.massage)
        }
    }
    else{
        alert("please enter current name, new name and number")
    }
    
}

function hidePB(event){
    body.children[2].setAttribute('hidden',true);
    body.children[1].removeAttribute('hidden'); 
    phoneBook.setAttribute("hidden", true);
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
function divHandler(event){
    if (event.target.innerText === 'show phone-book') {
        child = phoneBook.lastElementChild;
        while (child) {
            phoneBook.removeChild(child);
            child = phoneBook.lastElementChild;
            
        }
        getContacts().then(() => phoneBook.removeAttribute('hidden'));
        body.children[1].setAttribute('hidden',true);
        body.children[2].removeAttribute('hidden');
        
        
    }
    if (event.target.innerText === 'add/remove contacts') {
        const manage = document.getElementById('manage');
        manage.removeAttribute('hidden');
        
        
        
    }
    if (event.target.innerText === 'update contact') {
        const update = document.getElementById('update');
        update.removeAttribute('hidden')
        
        
        
    }
    
    
}
