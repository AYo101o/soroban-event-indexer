#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn test_ping_emits_event() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SampleContract);
    let client = SampleContractClient::new(&env, &contract_id);

    let caller = Address::generate(&env);
    env.mock_all_auths();

    let count = client.ping(&caller);
    assert_eq!(count, 1);

    let events = env.events().all();
    assert_eq!(events.len(), 1);
}