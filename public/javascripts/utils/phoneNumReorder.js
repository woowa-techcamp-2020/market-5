function phoneNumReorder(value){
    if(value.length === 3){
        value += '-'
    }

    else if(value.length === 8){
        value += '-'
    }

    return value;
}

// module.exports = phoneNumReorder;
export default phoneNumReorder;