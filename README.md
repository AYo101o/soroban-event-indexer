# Soroban Event Indexer

A lightweight indexing and analytics layer for Soroban smart contracts on Stellar.
Track contract events, query historical activity, and set up alerts — without
hand-rolling ledger parsing yourself.

## Status: Early development

## Structure
- `contracts/` — sample Soroban contract used for testing the indexer
- `indexer/` — listener service that captures and stores contract events
- `api/` — REST API for querying indexed data
- `dashboard/` — web UI for browsing events and analytics

## Live demo
https://dashboard-blush-tau-42.vercel.app