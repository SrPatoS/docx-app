import AsyncStorage from '@react-native-async-storage/async-storage';

type Keys = "auth"

export class LocalStorageCore {
  async create(key: Keys, data: Object): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key.toString(), jsonData);
    } catch (error) {
      console.error('Erro ao criar no AsyncStorage:', error);
      throw new Error('Não foi possível salvar os dados.');
    }
  }

  async read(key: Keys): Promise<Object | null> {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Erro ao ler do AsyncStorage:', error);
      return null;
    }
  }

  async remove(key: Keys): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do AsyncStorage:', error);
      throw new Error('Não foi possível remover os dados.');
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
      throw new Error('Não foi possível limpar os dados.');
    }
  }
}
