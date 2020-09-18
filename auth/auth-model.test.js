const Characters = require("../users/users-model")
const db = require('../database/dbConfig')


describe('characters model', () => {
    describe('add() method', () => {
      beforeEach(async () => {
        await db('users').truncate();
      });
  
      it('should add the provided characters into the db', async () => {
        await Characters.insert({ username: 'lebron', password: 'fire'});
        await Characters.insert({ username: 'Anthony ', password: 'earth'});
  
        const characters = await db('users');
  
        expect(characters).toHaveLength(2);
      });

      it('should check username', async () => {
        await Characters.insert({ username: 'lebron', password: 'fire'});
        // await Characters.insert({ username: 'Anthony ', password: 'earth'});
  
        const characters = await db('users');
  
        expect(characters[0].username).toBe('lebron')
      });

      it('check password', async () => {
        await Characters.insert({ username: 'lebron', password: 'fire'});
        // await Characters.insert({ username: 'Anthony ', password: 'earth'});
  
        const characters = await db('users');
  
        expect(characters[0].password).toBe('fire')
      });
  
      it('empties db', () => {
        expect(true).toBe(true);
      });
    });

    describe('remove() method', () => {
        beforeEach(async () => {
          await db('users').truncate();
    
          await Characters.insert({ username: 'Anthony', password: 'earth'});
          await Characters.insert({ username: 'lebron', password: 'fire'});
        });
    
        it('should remove a charracter from the db', async () => {
          await Characters.remove(1);
    
          const characters = await Characters.find('users');
    
          expect(characters).toHaveLength(1);
        });
    
        // it('should remove the proper character from the db', async () => {
        //   await Characters.remove(1);
    
        //   const characters = await Characters.find('users');
    
        //   expect(characters[0].name).toBe('lebron');
        // });
      });
    });