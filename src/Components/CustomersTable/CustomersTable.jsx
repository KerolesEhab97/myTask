import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function CustomersTable() {
    const [customers, setCustomers] = useState(null);
    const [filteredCustomers, setFilteredCustomers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    async function getCustomers() {
        try {
            const { data } = await axios.get('http://localhost:8000/customers');
            console.log(data);
            setCustomers(data);
            setFilteredCustomers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const filterCustomersByName = (name) => {
        setSearchTerm(name);
        if (!name) {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter(customer =>
                customer.name.toLowerCase().includes(name.toLowerCase())
            );
            setFilteredCustomers(filtered);
        }
    };

    return (
        <>
            <div className="container mx-auto p-10">
                <div className="mb-4">
                    <input
                        type="text"
                        className="px-3 py-2 border w-96 border-gray-300 rounded-md"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => filterCustomersByName(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Amount</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredCustomers?.map((customer) => (
                                <Table.Row key={customer.id} className="bg-white">
                                    <Table.Cell>{customer.name}</Table.Cell>
                                    <Table.Cell>{customer.id}</Table.Cell>
                                    <Table.Cell>{customer.date}</Table.Cell>
                                    <Table.Cell>{customer.amount}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}
