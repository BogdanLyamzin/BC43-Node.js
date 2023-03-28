const fs = require("fs/promises");

const func = async()=> {
    const filePath = "./files/file.txt";

    // const buffer = await fs.readFile(filePath);
    // const text = buffer.toString();
    // console.log(text);

    // const text = await fs.readFile(filePath, "utf-8");
    // console.log(text);

    // await fs.appendFile(filePath, "\nКодекс Ванталы");
    // await fs.writeFile(filePath, "Кодекс Ванталы");

    // await fs.appendFile("./files/file2.txt", "\nКодекс Ванталы");
    // await fs.writeFile("./files/file3.txt", "Кодекс Ванталы");`
}

func();

// fs.readFile("./files//file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })