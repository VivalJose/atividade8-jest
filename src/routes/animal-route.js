const express = require('express');
const router = express.Router();

const animais = [];

router.post('/', (req, res) => {
    const { nome, especie, idade } = req.body;

    if (!nome || nome.length < 2) {
        return res.status(400).json({ error: 'O nome deve ter pelo menos 2 caracteres' });
    }

    if (!idade || isNaN(idade)) {
        return res.status(400).json({ error: 'A idade deve ser um número' });
    }

    const novoAnimal = {
        nome,
        especie,
        idade: Number(idade),  
    };

    animais.push(novoAnimal);
    return res.status(201).json(novoAnimal);
});

router.get('/', (req, res) => {
    res.status(200).json(animais);
});

router.delete('/', (req, res) => {
    animais.length = 0;  
    res.status(200).json({ message: 'Todos os animais foram deletados' });
});

module.exports = router;
