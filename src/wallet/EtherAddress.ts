import { keccak256 } from "ethers";
import _ from "lodash";

/**
 * 	@class
 */
export class EtherAddress
{
	/**
	 * 	generate Ethereum Address by a string
	 *	@param input
	 */
	public static generateEthereumAddress( input : string ) : string | null
	{
		if ( ! _.isString( input ) || _.isEmpty( input ) )
		{
			throw new Error( `EtherAddress.generateEthereumAddress :: invalid input` );
		}

		try
		{
			//	Step 1:
			//	Convert the input string to bytes using TextEncoder.
			const inputBytes = new TextEncoder().encode( input );

			//	Step 2:
			//	Hash the input bytes using Keccak-256 from ethers.
			const keccakHash = keccak256( inputBytes );

			//	Step 3:
			//	Take the last 20 bytes (40 characters in hex) of the Keccak hash as the address.
			return `0x${ keccakHash.slice( -40 ) }`;
		}
		catch ( err )
		{
		}

		return null;
	}
}
