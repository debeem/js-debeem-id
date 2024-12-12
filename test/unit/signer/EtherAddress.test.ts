import { describe, expect } from '@jest/globals';
import { EtherAddress } from "../../../src/wallet/EtherAddress";
import { EtherWallet } from "../../../src";

/**
 *	WalletFactory unit test
 */
describe( "EtherAddress", () =>
{
	beforeAll( async () =>
	{
	} );
	afterAll( async () =>
	{
	} );

	describe( "Generate Ethereum Address", () =>
	{
		it( "#generateEthereumAddress, invalid input", async () =>
		{
			try
			{
				expect( EtherAddress.generateEthereumAddress( `` ) ).toBeNull();
			}
			catch ( err )
			{
				const errObj : any = err;
				expect( errObj ).not.toBeNull();
				expect( errObj.message ).toBe( `EtherAddress.generateEthereumAddress :: invalid input` );
			}
		} );

		it( "#generateEthereumAddress", async () =>
		{
			const address1 = EtherAddress.generateEthereumAddress( Date.now().toString() );
			expect( address1 ).not.toBeNull();
			expect( EtherWallet.isValidAddress( address1 ) ).toBeTruthy();
		} );

	} );
} );
