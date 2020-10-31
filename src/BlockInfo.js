

import React, { useEffect, useState } from 'react';
import {Table} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';



function Main(props){
    const { api } = useSubstrate();

    const[Block, setBlock] = useState();

    useEffect(()=> {
        let unsubscribe = null;

        api.rpc.chain.subscribeNewHeads((header) => {
            setBlock(header);
            //console.log(`Chain is at block: #${header.number}`);
        }).then(unsub =>{
            unsubscribe = unsub;
        }).catch(console.error);

        return () => unsubscribe && unsubscribe();
    }, []);

    /*
    const getInfo = async () =>{
        const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
            //console.log(`Chain is at block: #${header.hash}`);\
            setBlockNumber(header.number.toNumber());
            setBlockHash(header.hash.toHuman());
            setParrentHash(header.parentHash.toHuman());
            setExtrinsicsRoot(header.extrinsicsRoot.toHuman());
            setStateRoot()
            //console.log(blockHash)
            
        });
    }
    getInfo();*/
    
    return(
         <Table celled>
            {Block &&<Table.Body>
                <Table.Row>
                    <Table.Cell> Block Number </Table.Cell>
                    <Table.Cell>{Block.number.toNumber()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Block Hash </Table.Cell>
                    <Table.Cell> {Block.hash.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Parent Hash </Table.Cell>
                    <Table.Cell> {Block.parentHash.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Extrinsic Root </Table.Cell>
                    <Table.Cell> {Block.extrinsicsRoot.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> State Root </Table.Cell>
                    <Table.Cell> {Block.stateRoot.toHuman()}</Table.Cell>
                </Table.Row>
            </Table.Body>}
        </Table>
    );

}

export default function BlockInfo(props){
    const{api} = useSubstrate();
    return api.rpc &&
    api.rpc.chain &&
    api.rpc.chain.subscribeNewHeads  ? (
        <Main {...props} />
    ) : null;
}