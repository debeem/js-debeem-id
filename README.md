# debeem-id
The `debeem-id` is a simple and easy-to-use Web3 software development toolkit developed by the `DeBeem` open-source organization.

Based on Ethereum wallet technology, `debeem-id` is an infrastructure component of the `DeBeem` ecosystem, offering features such as strict validation of data to be signed, data signing, signature verification, and identity authentication.


## Table of contents
- [Key features](#key-features)
- [How it works](#how-it-works)
- [Create a signer](#create-a-signer)
- [Sign Data](#sign-data)
- [Validate Signature](#validate-signature)
- [Object that cannot be signed](#object-that-cannot-be-signed)


## Key features

- **EtherWallet** 

    Core functionality component of the Ethereum wallet, including wallet creation, import, recovery, wallet address validation, wallet derivation, and other features.


- **Web3Digester** 

    Provides hash digest and result format validation functionality for a JSON Object.


- **Web3Encoder** 

    Provides encoding and decoding functionality for a JSON Object.


- **Web3Signer** 

    Provides signing and result format validation functionality for a JSON Object.


- **Web3Validator** 

    Used to verify if the signature of a JSON Object is correct.


- **ValidateSerializable** 

    Used to strictly validate whether a JSON Object can be signed.


## How it works
- Sign the data with the wallet's private key, and you will get a signature string.
- The wallet address will be included in the data packet. When verifying the signature, you need to enter the wallet address and signature. `debeem-id` will verify whether the signature of the data package is signed by the private key of the owner of the wallet address.
- Therefore, it is verified that the packet belongs to the specified user (wallet address).


## Create a signer

The signer is based on the wallet, so creating a signer is equivalent to creating a wallet. Subsequently, we can sign the data using the `wallet's private key`.

1. Create a random HD wallet object
```typescript
const walletObj = EtherWallet.createWalletFromMnemonic();
```

```typescript
{
    isHD: true,
    mnemonic: 'million butter obtain fuel address truck grunt recall gain rotate debris flee',
    password: '',
    address: '0x03a06e86556C819199E602851e4453a89718cB36',
    publicKey: '0x0384636daeaf2f410f7c4a6749a143096838a0482bcee94e412ca3a683bca3ac00',
    privateKey: '0x44dd0864d00e37090622a17e66c0914bd71a1245a3a2e4f88611775854f4eafc',
    index: 0,
    path: "m/44'/60'/0'/0/0"
}
```

2. Create a wallet object using a user-specified mnemonic phrase
```typescript
const mnemonic = 'olympic cradle tragic crucial exit annual silly cloth scale fine gesture ancient';
const walletObj = EtherWallet.createWalletFromMnemonic( mnemonic );
```
```typescript
{
    isHD: true,
    mnemonic: 'olympic cradle tragic crucial exit annual silly cloth scale fine gesture ancient',
    password: '',
    address: '0xC8F60EaF5988aC37a2963aC5Fabe97f709d6b357',
    publicKey: '0x03ed2098910ab9068abd54e1562eb9dee3cb2d9fc1426dfe91541970a89b5aa622',
    privateKey: '0xf8ba731e3d09ce93ee6256d7393e993be01cd84de044798372c0d1a8ad9b952a',
    index: 0,
    path: "m/44'/60'/0'/0/0"
}
```


3. Create a wallet with a user-specified private key
```typescript
const privateKey = "0xf8ba731e3d09ce93ee6256d7393e993be01cd84de044798372c0d1a8ad9b952a";
const walletObj = EtherWallet.createWalletFromPrivateKey( privateKey );
```
```typescript
{
    isHD: false,
    mnemonic: '',
    password: '',
    address: '0xC8F60EaF5988aC37a2963aC5Fabe97f709d6b357',
    publicKey: '0x03ed2098910ab9068abd54e1562eb9dee3cb2d9fc1426dfe91541970a89b5aa622',
    privateKey: '0xf8ba731e3d09ce93ee6256d7393e993be01cd84de044798372c0d1a8ad9b952a',
    index: 0,
    path: null
}
```



## Sign Data
When signing data, you need to enter:
- data to be signed, here is a JavaScript object structure
- wallet private key

The output is a `signature string`

1. Web3Signer.signObject( privateKey : string | SigningKey, obj : any, exceptedKeys ? : Array&lt;string&gt; ) : Promise&lt;string&gt;
```typescript
let toBeSignedObject = {
	version : '1.0.0',
	deleted : 0,
	wallet : walletObj.address,
	address : '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
	sig : ``,
	name : `Sam`,
	avatar : 'https://avatars.githubusercontent.com/u/142800322?v=4',
	remark : 'no remark',
	createdAt: JSON.stringify( new Date() ),
	updatedAt: JSON.stringify( new Date() )
};
//      .sig, .createdAt, .updatedAt are ignored by default 
const exceptedKeys : Array<string> = [ 'remark' ];
const privateKey = walletObj.privateKey;
toBeSignedObject.sig = await Web3Signer.signObject( privateKey, toBeSignedObject, exceptedKeys );
```
```
//  toBeSignedObject.sig
0xa52c1d36c2528a2f460ea5a344481d38455f78c0bd046802a51aefafc275ef1678a09aa8151e49cc2880131ad247fd6d469e1367b16ff08eff3ccfa9d654679f1c
```

## Validate Signature
To verify whether the signature of the data belongs to the specified wallet address, you need to enter:
- data to be signed, here is a JavaScript object structure
- wallet address
- signature string

The output is a `boolean value` indicating whether the data is signed by the private key of the owner of the specified wallet address.

1. Web3Validator.validateObject( signerWalletAddress : string, obj : any, sig : string, exceptedKeys ? : Array&lt;string&gt; ) : Promise&lt;boolean&gt;
```typescript
const walletAddress = walletObj.address;
const sig = toBeSignedObject.sig;

//      .sig, .createdAt, .updatedAt are ignored by default
const exceptedKeys : Array<string> = [ 'remark' ];
const valid = await Web3Validator.validateObject( walletAddress, toBeSignedObject, sig, exceptedKeys );
```
```typescript
//      valid
true
```

## Object that cannot be signed

Objects whose type of the object itself or any of its sub-elements belong to the following types cannot be signed.

- undefined
- function
- symbol
- Map
- Set
- BigInt
- Date
- RegExp


