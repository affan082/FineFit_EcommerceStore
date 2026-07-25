const Product = require('../models/Product');



exports.getProducts = async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
};



exports.getProductById = async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: ' Product not found'});
    res.json(product);
};



exports.createProduct = async(req, res) =>{
    try{
        const images = req.files ? req.files.map(f => f.path) : [];
       const product = await Product.create({ ...req.body, images, createdBy : req.user._id });
       res.status(201).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }    
};



exports.updateProduct = async(req, res) =>{
    try{
        const updateData = { ...req.body};
        if (req.files && req.files.length > 0){
            updateData.images = req.files.map(f => f.path);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, updateData, {new: true});
    if(!product) return res.status(404).json({message: ' Product not found'});
    res.json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }    
};



exports.deleteProduct = async(req, res) =>{
    const product = await Product.findByIdAndDelete(req.params.id); 
    if(!product) return res.status(404).json({message:' Product not found'});
    res.json({message: 'Product deleted'});
};