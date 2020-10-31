import React, { useState } from 'react';
import { Form, Table } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main (props) {
    const { api } = useSubstrate();

    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState();

    const searchBlock = async (blockNumber) => {
        try{
            const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
            //console.log(blockHash.toHuman());
            const header = await api.rpc.chain.getHeader(blockHash);
            setBlock(header);
        }
        catch(error){
            console.error(error);
        }
    }
    
    return(
        <div>
            <Form onSubmit = {async (e, { value }) => await searchBlock(blockNumber)}>
                <Form.Group>
                    <Form.Input placeholder="Block Number..." onChange= {async (e, { value }) => setBlockNumber(value)}/>
                    <Form.Button > Search for Block</Form.Button>
                </Form.Group>   
            </Form>
            { block &&( <Table celled>
            <Table.Row>
                    <Table.Cell> Block Number </Table.Cell>
                    <Table.Cell>{block.number.toNumber()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Block Hash </Table.Cell>
                    <Table.Cell> {block.hash.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Parent Hash </Table.Cell>
                    <Table.Cell> {block.parentHash.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> Extrinsic Root </Table.Cell>
                    <Table.Cell> {block.extrinsicsRoot.toHuman()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell> State Root </Table.Cell>
                    <Table.Cell> {block.stateRoot.toHuman()}</Table.Cell>
                </Table.Row>
            </Table>)}
        </div>
    );
}


export default function BlockSearchInfo(props){
    const{api} = useSubstrate();
    return api.rpc &&
    api.rpc.chain ? (
        <Main {...props} />
    ) : null;
}