mod test;

#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

#[contracttype]
pub enum DataKey {
    Counter,
}

#[contract]
pub struct SampleContract;

#[contractimpl]
impl SampleContract {
    pub fn ping(env: Env, caller: Address) -> u32 {
        caller.require_auth();

        let mut count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::Counter)
            .unwrap_or(0);
        count += 1;
        env.storage().instance().set(&DataKey::Counter, &count);

        env.events().publish(
            (symbol_short!("ping"), caller.clone()),
            count,
        );

        count
    }

    pub fn transfer_test(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();

        env.events().publish(
            (Symbol::new(&env, "transfer"), from, to),
            amount,
        );
    }
}