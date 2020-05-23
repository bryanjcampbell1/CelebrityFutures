//mock data

let asset1 = {  artist: 'Lil Wayne',
    quantity: '3.0',
    boughtAt: '85',
    date: '06/01/20',
}

let asset2 = {  artist: 'Lil Yaughty',
    quantity: '2.0',
    boughtAt: '75',
    date: '06/01/20',
}

let asset3 = {  artist: 'Lil Pump',
    quantity: '7.5',
    boughtAt: '75',
    date: '07/01/20',
}
let asset4 = {  artist: 'Lil Peep',
    quantity: '3.0',
    boughtAt: '65',
    date: '07/01/20',
}



let tx1 = {  artist: 'Lil Wayne',
    quantity: '3.0',
    boughtAt: '85',
    soldAt: '95',
    date: '06/01/20',

}

let tx2 = {  artist: 'Lil Yaughty',
    quantity: '2.0',
    boughtAt: '75',
    soldAt: '',
    date: '06/01/20',
}

let tx3 = {  artist: 'Lil Pump',
    quantity: '7.5',
    boughtAt: '75',
    soldAt: '',
    date: '07/01/20',
}
let tx4 = {  artist: 'Lil Peep',
    quantity: '3.0',
    boughtAt: '65',
    soldAt: '89',
    date: '07/01/20',
}

let tx5 = {  artist: 'Lil Pump',
    quantity: '2.5',
    boughtAt: '75',
    soldAt: '78',
    date: '07/01/20',
}
let tx6 = {  artist: 'Lil Peep',
    quantity: '3.0',
    boughtAt: '65',
    soldAt: '89',
    date: '07/01/20',
}


let shares1 ={ artist:'Travis Scott',
    quantityAvailable: '7.0',
    price: '60',
    settledOn:'06/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}
let shares2 ={ artist:'Travis Scott',
    quantityAvailable: '8.0',
    price: '60',
    settledOn:'07/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}
let shares3 ={ artist:'Travis Scott',
    quantityAvailable: '4.0',
    price: '60',
    settledOn:'08/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}
let shares4 ={ artist:'Travis Scott',
    quantityAvailable: '10.0',
    price: '60',
    settledOn:'09/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}
let shares5 ={ artist:'Travis Scott',
    quantityAvailable: '3.0',
    price: '60',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}




let collateralizedShare1 = { artist:'Travis Scott',
    quantityCreated: '3.0',
    currentValueOfShares: '60',
    minimumCollateralizationRatio:'.2',
    collateral: '40',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}

let collateralizedShare2 ={ artist:'Travis Scott',
    quantityCreated: '3.0',
    currentValueOfShares: '60',
    minimumCollateralizationRatio:'.2',
    collateral: '40',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}

let collateralizedShare3 ={ artist:'Travis Scott',
    quantityCreated: '3.0',
    currentValueOfShares: '60',
    minimumCollateralizationRatio:'.2',
    collateral: '40',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}

let collateralizedShare4 ={ artist:'Travis Scott',
    quantityCreated: '3.0',
    currentValueOfShares: '60',
    minimumCollateralizationRatio:'.2',
    collateral: '40',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}

let collateralizedShare5 ={ artist:'Travis Scott',
    quantityCreated: '3.0',
    currentValueOfShares: '60',
    minimumCollateralizationRatio:'.2',
    collateral: '40',
    settledOn:'10/01/20',
    contractAddress: '0x016d96D3d581Bc81Cdfb35CbA6eb91233BB47A12'
}


let mock_assets =[asset1, asset2, asset3, asset4];
let mock_history = [tx1, tx2, tx3, tx4, tx5, tx6];
let mock_AvailableShares = [shares1,shares2,shares3,shares4,shares5];
let mock_collateralizedShares = [collateralizedShare1, collateralizedShare2, collateralizedShare3,collateralizedShare4,collateralizedShare5]

let mock = {assets: mock_assets, history:mock_history, availableShares:mock_AvailableShares, collateralizedShares:mock_collateralizedShares }

export default mock