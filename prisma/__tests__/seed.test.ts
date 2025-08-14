import { PrismaClient } from '@prisma/client';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    mstTimezone: {
      createMany: jest.fn(),
    },
    mstLocale: {
      createMany: jest.fn(),
    },
    mstCurrency: {
      createMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock the seed module to isolate main function
let mockPrisma: any;

describe('Database Seed Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    
    // Get fresh instance of mocked PrismaClient
    mockPrisma = new PrismaClient();
    
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock process.exit
    jest.spyOn(process, 'exit').mockImplementation((code?: number) => {
      throw new Error(`process.exit called with code ${code}`);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('main function execution', () => {
    it('should successfully seed all master data tables', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      // Dynamically import the seed module to get main function
      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalledTimes(1);
      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalledTimes(1);
      expect(mockPrisma.mstCurrency.createMany).toHaveBeenCalledTimes(1);
    });

    it('should execute seeding operations in the correct order', async () => {
      const executionOrder: string[] = [];
      
      mockPrisma.mstTimezone.createMany.mockImplementation(() => {
        executionOrder.push('timezone');
        return Promise.resolve({ count: 4 });
      });
      
      mockPrisma.mstLocale.createMany.mockImplementation(() => {
        executionOrder.push('locale');
        return Promise.resolve({ count: 2 });
      });
      
      mockPrisma.mstCurrency.createMany.mockImplementation(() => {
        executionOrder.push('currency');
        return Promise.resolve({ count: 5 });
      });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(executionOrder).toEqual(['timezone', 'locale', 'currency']);
    });
  });

  describe('Timezone seeding', () => {
    it('should create timezone records with correct data structure', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalledWith({
        data: [
          { name: 'JST', offset: '+09:00' },
          { name: 'HST', offset: '-10:00' },
          { name: 'CET', offset: '+01:00' },
          { name: 'EST', offset: '-05:00' },
        ],
        skipDuplicates: true,
      });
    });

    it('should include all required timezone fields', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      const timezones = timezoneCall.data;

      timezones.forEach((timezone: any) => {
        expect(timezone).toHaveProperty('name');
        expect(timezone).toHaveProperty('offset');
        expect(typeof timezone.name).toBe('string');
        expect(typeof timezone.offset).toBe('string');
        expect(timezone.offset).toMatch(/^[+-]\d{2}:\d{2}$/);
      });
    });

    it('should set skipDuplicates to true for timezones', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skipDuplicates: true,
        })
      );
    });

    it('should include comprehensive timezone coverage across regions', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      const timezones = timezoneCall.data;

      const timezoneNames = timezones.map((tz: any) => tz.name);
      expect(timezoneNames).toContain('JST'); // Asia
      expect(timezoneNames).toContain('HST'); // Pacific
      expect(timezoneNames).toContain('CET'); // Europe
      expect(timezoneNames).toContain('EST'); // North America
    });

    it('should have unique timezone names', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      const timezones = timezoneCall.data;

      const names = timezones.map((timezone: any) => timezone.name);
      const uniqueNames = [...new Set(names)];

      expect(names.length).toBe(uniqueNames.length);
    });
  });

  describe('Locale seeding', () => {
    it('should create locale records with correct data structure', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalledWith({
        data: [
          { code: 'ja-JP', label: '日本語' },
          { code: 'en-US', label: 'English' },
        ],
        skipDuplicates: true,
      });
    });

    it('should include all required locale fields', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const localeCall = mockPrisma.mstLocale.createMany.mock.calls[0][0];
      const locales = localeCall.data;

      locales.forEach((locale: any) => {
        expect(locale).toHaveProperty('code');
        expect(locale).toHaveProperty('label');
        expect(typeof locale.code).toBe('string');
        expect(typeof locale.label).toBe('string');
        expect(locale.code).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
      });
    });

    it('should set skipDuplicates to true for locales', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skipDuplicates: true,
        })
      );
    });

    it('should have unique locale codes', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const localeCall = mockPrisma.mstLocale.createMany.mock.calls[0][0];
      const locales = localeCall.data;

      const codes = locales.map((locale: any) => locale.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes.length).toBe(uniqueCodes.length);
    });

    it('should include both Japanese and English locales', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const localeCall = mockPrisma.mstLocale.createMany.mock.calls[0][0];
      const locales = localeCall.data;

      const validCodes = ['ja-JP', 'en-US'];
      const actualCodes = locales.map((locale: any) => locale.code);

      expect(actualCodes).toEqual(validCodes);
    });
  });

  describe('Currency seeding', () => {
    it('should create currency records with correct data structure', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstCurrency.createMany).toHaveBeenCalledWith({
        data: [
          { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
          { code: 'USD', name: 'US Dollar', symbol: '$' },
          { code: 'EUR', name: 'Euro', symbol: '€' },
          { code: 'GBP', name: 'British Pound', symbol: '£' },
          { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        ],
        skipDuplicates: true,
      });
    });

    it('should include all required currency fields', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      const currencies = currencyCall.data;

      currencies.forEach((currency: any) => {
        expect(currency).toHaveProperty('code');
        expect(currency).toHaveProperty('name');
        expect(currency).toHaveProperty('symbol');
        expect(typeof currency.code).toBe('string');
        expect(typeof currency.name).toBe('string');
        expect(typeof currency.symbol).toBe('string');
        expect(currency.code).toMatch(/^[A-Z]{3}$/);
      });
    });

    it('should set skipDuplicates to true for currencies', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      expect(mockPrisma.mstCurrency.createMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skipDuplicates: true,
        })
      );
    });

    it('should have unique currency symbols', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      const currencies = currencyCall.data;

      const symbols = currencies.map((currency: any) => currency.symbol);
      const uniqueSymbols = [...new Set(symbols)];

      expect(symbols.length).toBe(uniqueSymbols.length);
    });

    it('should include major world currencies', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      const currencies = currencyCall.data;

      const currencyCodes = currencies.map((currency: any) => currency.code);
      
      expect(currencyCodes).toContain('USD'); // US Dollar
      expect(currencyCodes).toContain('EUR'); // Euro
      expect(currencyCodes).toContain('JPY'); // Japanese Yen
      expect(currencyCodes).toContain('GBP'); // British Pound
      expect(currencyCodes).toContain('AUD'); // Australian Dollar
    });

    it('should have valid ISO 4217 currency codes', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      const currencies = currencyCall.data;

      const validCodes = ['JPY', 'USD', 'EUR', 'GBP', 'AUD'];
      const actualCodes = currencies.map((currency: any) => currency.code);

      expect(actualCodes).toEqual(validCodes);
    });
  });

  describe('Error handling scenarios', () => {
    it('should handle database connection errors gracefully', async () => {
      const dbError = new Error('Database connection failed');
      mockPrisma.mstTimezone.createMany.mockRejectedValue(dbError);

      const seedModule = await import('../seed');
      
      await expect(seedModule.main()).rejects.toThrow('Database connection failed');
    });

    it('should handle timezone creation errors', async () => {
      const timezoneError = new Error('Timezone creation failed');
      mockPrisma.mstTimezone.createMany.mockRejectedValue(timezoneError);

      const seedModule = await import('../seed');
      
      await expect(seedModule.main()).rejects.toThrow('Timezone creation failed');
    });

    it('should handle locale creation errors', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      
      const localeError = new Error('Locale creation failed');
      mockPrisma.mstLocale.createMany.mockRejectedValue(localeError);

      const seedModule = await import('../seed');
      
      await expect(seedModule.main()).rejects.toThrow('Locale creation failed');
    });

    it('should handle currency creation errors', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      
      const currencyError = new Error('Currency creation failed');
      mockPrisma.mstCurrency.createMany.mockRejectedValue(currencyError);

      const seedModule = await import('../seed');
      
      await expect(seedModule.main()).rejects.toThrow('Currency creation failed');
    });

    it('should handle partial failures correctly', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      
      const currencyError = new Error('Currency creation failed');
      mockPrisma.mstCurrency.createMany.mockRejectedValue(currencyError);

      const seedModule = await import('../seed');
      
      await expect(seedModule.main()).rejects.toThrow('Currency creation failed');
      
      // Verify that timezone and locale operations were attempted
      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalled();
      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalled();
    });
  });

  describe('Data integrity and validation', () => {
    it('should seed correct number of records for each entity', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      expect(timezoneCall.data).toHaveLength(4);

      const localeCall = mockPrisma.mstLocale.createMany.mock.calls[0][0];
      expect(localeCall.data).toHaveLength(2);

      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      expect(currencyCall.data).toHaveLength(5);
    });

    it('should contain valid timezone offset formats', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      const timezones = timezoneCall.data;

      const validOffsets = ['+09:00', '-10:00', '+01:00', '-05:00'];
      const actualOffsets = timezones.map((tz: any) => tz.offset);

      expect(actualOffsets).toEqual(validOffsets);
    });

    it('should validate that all required fields are present', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      // Validate timezone fields
      const timezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      timezoneCall.data.forEach((timezone: any) => {
        expect(timezone.name).toBeDefined();
        expect(timezone.offset).toBeDefined();
        expect(timezone.name.length).toBeGreaterThan(0);
        expect(timezone.offset.length).toBeGreaterThan(0);
      });

      // Validate locale fields
      const localeCall = mockPrisma.mstLocale.createMany.mock.calls[0][0];
      localeCall.data.forEach((locale: any) => {
        expect(locale.code).toBeDefined();
        expect(locale.label).toBeDefined();
        expect(locale.code.length).toBeGreaterThan(0);
        expect(locale.label.length).toBeGreaterThan(0);
      });

      // Validate currency fields
      const currencyCall = mockPrisma.mstCurrency.createMany.mock.calls[0][0];
      currencyCall.data.forEach((currency: any) => {
        expect(currency.code).toBeDefined();
        expect(currency.name).toBeDefined();
        expect(currency.symbol).toBeDefined();
        expect(currency.code.length).toBe(3);
        expect(currency.name.length).toBeGreaterThan(0);
        expect(currency.symbol.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Edge cases and boundary conditions', () => {
    it('should handle empty database state', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      await seedModule.main();

      // Verify that skipDuplicates is set to handle existing data gracefully
      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalledWith(
        expect.objectContaining({ skipDuplicates: true })
      );
      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalledWith(
        expect.objectContaining({ skipDuplicates: true })
      );
      expect(mockPrisma.mstCurrency.createMany).toHaveBeenCalledWith(
        expect.objectContaining({ skipDuplicates: true })
      );
    });

    it('should handle zero records being created due to duplicates', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 0 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 0 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 0 });

      const seedModule = await import('../seed');
      
      // Should not throw error even if no new records are created
      await expect(seedModule.main()).resolves.not.toThrow();
    });

    it('should maintain data consistency across multiple runs', async () => {
      mockPrisma.mstTimezone.createMany.mockResolvedValue({ count: 4 });
      mockPrisma.mstLocale.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.mstCurrency.createMany.mockResolvedValue({ count: 5 });

      const seedModule = await import('../seed');
      
      // Run multiple times to verify idempotency
      await seedModule.main();
      await seedModule.main();

      // Verify same data is attempted to be inserted each time
      expect(mockPrisma.mstTimezone.createMany).toHaveBeenCalledTimes(2);
      expect(mockPrisma.mstLocale.createMany).toHaveBeenCalledTimes(2);
      expect(mockPrisma.mstCurrency.createMany).toHaveBeenCalledTimes(2);

      // Verify data structure consistency
      const firstTimezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[0][0];
      const secondTimezoneCall = mockPrisma.mstTimezone.createMany.mock.calls[1][0];
      expect(firstTimezoneCall.data).toEqual(secondTimezoneCall.data);
    });
  });
});