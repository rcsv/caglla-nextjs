# Prisma Seed Tests

This directory contains comprehensive unit tests for the Prisma database seed script.

## Test Framework

- **Framework**: Jest with TypeScript support
- **Mocking**: PrismaClient is mocked to isolate the seed logic
- **Coverage**: Tests cover happy paths, error scenarios, and edge cases

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run only seed tests
npm test -- prisma/__tests__/seed.test.ts
```

## Test Coverage

The test suite covers:

1. **Core Functionality**
   - Successful seeding of all master data tables
   - Correct execution order of operations
   - Proper data structure validation

2. **Data Integrity**
   - Timezone offset format validation
   - Locale code format validation
   - Currency code format validation (ISO 4217)
   - Uniqueness constraints

3. **Error Handling**
   - Database connection failures
   - Individual table creation failures
   - Partial failure scenarios

4. **Edge Cases**
   - Empty database state
   - Duplicate data handling (skipDuplicates)
   - Multiple execution runs (idempotency)

## Adding New Tests

When adding new seed data or modifying existing data:

1. Update the corresponding test expectations
2. Add new test cases for any new validation rules
3. Ensure error scenarios are covered
4. Verify edge cases are handled appropriately