import PostMessage from './models/postMessage.js';
import postData from '../database/posts.json' assert { type: 'json' };


PostMessage.deleteMany({})
    .then(()=> {
        return PostMessage.collection.insertMany(postData)
    })
    .then((res) => console.log('updated db' + res))
    .finally(() => {
        process.exit()
    });
