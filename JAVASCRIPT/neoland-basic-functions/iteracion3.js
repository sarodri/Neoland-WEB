const numbers = [1, 2, 3, 5, 45, 37, 58];

function sumAll(numbers) {
    let suma=0;
    for (let i=0; i < numbers.length; i++){    
        suma = suma + numbers[i] 
    }  console.log(suma)
} 

sumAll(numbers);